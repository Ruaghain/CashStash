'use strict';

import webpack from 'webpack';
import makeWebpackConfig from './webpack.config.dev';
import gulp from 'gulp';
import del from 'del';
import gulpLoadPlugins from 'gulp-load-plugins';
import nodemon from 'nodemon';
import typescript from 'typescript';
import { Server as KarmaServer } from 'karma';
import tscConfig from './tsconfig.json';

// import _ from 'lodash';
// import grunt from 'grunt';
// import path from 'path';
// import through2 from 'through2';
// import http from 'http';
// import open from 'open';
// import lazypipe from 'lazypipe';
// import runSequence from 'run-sequence';

// const webpack = require('webpack-stream');
// const makeWebpackConfig = require('./webpack.make');
// const gulp = require('gulp');
// const del = require('del');
// const typescript = require('gulp-typescript');
// const tscConfig = require('./tsconfig.json');
// const gulpLoadPlugins = require('gulp-load-plugins');
// const nodemon = require('nodemon');
// const karmaServer = require('karma').Server;

var plugins = gulpLoadPlugins();
var config;

const serverPath = 'server';
const paths = {
  client: {},
  server: {},
  karma: 'karma.conf.js',
  dist: 'dist'
};

// clean the contents of the distribution directory
gulp.task('clean', function () {
  return del('dist/**/*');
});

// TypeScript compile
gulp.task('compile', ['clean'], function () {
  return gulp
    .src('client/src/**/*.ts')
    .pipe(typescript(tscConfig))
    .pipe(gulp.dest('dist/app'));
});

// gulp.task('webpack:dev', function() {
//   const webpackDevConfig = makeWebpackConfig({ DEV: true });
//   return gulp.src(webpackDevConfig.entry.app)
//     .pipe(plugins.plumber())
//     .pipe(webpack(webpackDevConfig))
//     .pipe(gulp.dest('dist'));
// });
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
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';
  config = require(`./${serverPath}/config/environment`);
  nodemon(`-w ${serverPath} ${serverPath}`)
    .on('log', onServerLog);
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


gulp.task('build', ['compile']);
gulp.task('default', ['build']);
