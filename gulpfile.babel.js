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
import http from 'http';

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
      this.emit('end');
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
function checkAppReady(cb) {
  var options = {
    host: 'localhost',
    port: config.port
  };
  http
    .get(options, () => cb(true))
    .on('error', () => cb(false));
}

function whenServerReady(cb) {
  var serverReady = false;
  var appReadyInterval = setInterval(() =>
      checkAppReady((ready) => {
        if (!ready || serverReady) {
          return;
        }
        clearInterval(appReadyInterval);
        serverReady = true;
        cb();
      }),
    100);
}

/********************
 * Env
 ********************/

gulp.task('env:all', () => {
  var localConfig;
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

gulp.task('start:client', cb => {
  whenServerReady(() => {
    open('http://localhost:' + config.port);
    cb();
  });
});

gulp.task('start:server', () => {
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';
  config = require(`./${serverPath}/config/environment`);
  return nodemon({
    script: `./${serverPath}/app.js`
  }).on('error', (error) => {
    console.log('There was an error: ' + error);
  });
});

gulp.task('start:server:debug', () => {
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';
  config = require(`./${serverPath}/config/environment`);
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
    [
      'clean',
    ],
    [
      'webpack:dev',
    ],
    [
      'start:server'
    ],
    [
      'watch'
    ],
    cb
  );
});

gulp.task('serve:debug', cb => {
  runSequence(
    [
      'clean',
    ],
    [
      'webpack:dev',
    ],
    [
      'start:server:debug',
      //TODO: Need to get the start client working correctly.
      //'start:client'
    ],
    'watch',
    cb);
});

gulp.task('build', ['compile']);
gulp.task('default', ['build']);
