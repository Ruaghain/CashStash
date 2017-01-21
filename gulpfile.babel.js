'use strict';

import _ from 'lodash';
import webpack from 'webpack-stream';
import webpack_dev from './webpack.dev';
import gulp from 'gulp';
import del from 'del';
import gulpLoadPlugins from 'gulp-load-plugins';
import nodemon from 'nodemon';
import { Server as KarmaServer } from 'karma';
import runSequence from 'run-sequence';

// import path from 'path';
// import through2 from 'through2';
// import http from 'http';
// import open from 'open';
// import lazypipe from 'lazypipe';


var plugins = gulpLoadPlugins();
var config;

const serverPath = 'server';
const paths = {
  client: {},
  server: {
    scripts: [
      `${serverPath}/**/!(*.spec|*.integration).js`,
      `!${serverPath}/config/local.env.sample.js`
    ],
  },
  karma: 'karma.conf.js',
  dist: 'dist/js'
};

// clean the contents of the distribution directory
gulp.task('clean', function () {
  return del('dist/**/*');
});

gulp.task('webpack:dev', function () {
  return gulp.src(webpack_dev.entry.app)
    .pipe(webpack(webpack_dev))
    .on('error', function handleError(e) {
      this.emit('There was an error: ' + e);
    })
    .pipe(gulp.dest(paths.dist));
});
//
// gulp.task('webpack:test', function() {
//   const webpackTestConfig = makeWebpackConfig({ TEST: true });
//   return gulp.src(webpackTestConfig.entry.app)
//     .pipe(webpack(webpackTestConfig))
//     .pipe(gulp.dest('dist'));
// });

/********************
 * Helper functions
 ********************/

function onServerLog(log) {
  console.log(plugins.util.colors.white('[') +
    plugins.util.colors.yellow('nodemon') +
    plugins.util.colors.white('] ') +
    log.message);
}

/********************
 * Env
 ********************/

gulp.task('env:all', () => {
  let localConfig;
  try {
    localConfig = require(`./${serverPath}/config/local.env`);
  } catch (e) {
    localConfig = {};
  }
  plugins.env({
    vars: localConfig
  });
});
gulp.task('env:test', () => {
  plugins.env({
    vars: { NODE_ENV: 'test' }
  });
});

gulp.task('env:prod', () => {
  plugins.env({
    vars: { NODE_ENV: 'production' }
  });
});

gulp.task('start:server', () => {
  return nodemon({
    script: `./${serverPath}/app.js`
  }).on('error', (error) => {
    console.log('There was an error: ' + error);
  });
});

gulp.task('test:client', (done) => {
  new KarmaServer({
    configFile: `${__dirname}/${paths.karma}`,
    singleRun: true
  }, err => {
    done(err);
    process.exit(err);
  }).start();
});

gulp.task('watch', () => {
  plugins.watch(paths.server.scripts)
    .pipe(plugins.plumber());
});

gulp.task('serve', cb => {
  runSequence(
    ['start:server'],
    'watch',
    cb
  );
});

gulp.task('build', ['compile']);
gulp.task('default', ['build']);