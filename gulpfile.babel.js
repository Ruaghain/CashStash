'use strict';

import webpack from "webpack";
import webpackStream from "webpack-stream";
import webpackDev from "./config/webpack/webpack.dev";
import webpackTest from "./config/webpack/webpack.test";
import gulp from "gulp";
import del from "del";
import jasmineNode from "gulp-jasmine-node";
import gulpLoadPlugins from "gulp-load-plugins";
import nodemon from "nodemon";
import { Server as KarmaServer } from "karma";
import runSequence from "run-sequence";
import http from "http";
import open from "open";

// import path from 'path';
// import through2 from 'through2';
// import http from 'http';
// import open from 'open';
// import lazypipe from 'lazypipe';


var plugins = gulpLoadPlugins();
var config;

const serverPath = 'server';
const clientPath = 'client';

const paths = {
  client: {
    scripts: [
      `${clientPath}/**/*.html`,
      `${clientPath}/**/!(*.spec).ts`,
      `${clientPath}/**/*.scss`
    ]
  },
  server: {
    scripts: [
      `${serverPath}/**/!(*.spec|*.integration).js`,
      `!${serverPath}/config/local.env.sample.js`
    ],
    test: {
      unit: [`${serverPath}/api/**/*.spec.js`]
    }
  },
  karma: 'karma.conf.js',
  dist: 'dist/js'
};

// clean the contents of the distribution directory
gulp.task('clean', function () {
  return del('dist/**/*');
});

gulp.task('webpack:dev', function () {
  return gulp.src(webpackDev.entry.app)
    .pipe(webpackStream(webpackDev, webpack))
    .on('error', function handleError(e) {
      this.emit('end');
    })
    .pipe(gulp.dest(paths.dist));
});

//This is for the test environment.
gulp.task('webpack:test', function () {
  return gulp.src(webpackDev.entry.app)
    .pipe(webpackStream(webpackTest, webpack))
    .on('error', function handleError(e) {
      this.emit('end');
    })
    .pipe(gulp.dest(paths.dist));
});

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

gulp.task('test:client', (done) => {
  new KarmaServer({
    configFile: `${__dirname}/${paths.karma}`,
    singleRun: false,
    autoWatch: true,
    browsers: ['Chrome']
  }, err => {
    done(err);
    process.exit(err);
  }).start();
});

gulp.task('test:server', (cb) => {
  runSequence(
    'env:all',
    'env:test',
    //'start:server',
    'jasmine:unit',
    cb);
});

gulp.task('jasmine:unit', () => {
  gulp.src(paths.server.test.unit)
    .pipe(jasmineNode());
});

gulp.task('watch', () => {
  plugins.watch(paths.server.scripts)
    .pipe(plugins.plumber());
});

gulp.task('watch:client', () => {
  gulp.watch(paths.client.scripts, ['clean', 'webpack:dev'])
});

gulp.task('watch:server', () => {
  plugins.watch(paths.client.scripts)
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
    'watch:client',
    cb
  );
});

gulp.task('serve:debug', cb => {
  runSequence(
    [
      'clean',
    ],
    [
      'webpack:dev'
    ],
    [
      'start:server',
      'start:client'
    ],
    'watch',
    cb
  );
});

gulp.task('build', ['compile']);
gulp.task('default', ['build']);
