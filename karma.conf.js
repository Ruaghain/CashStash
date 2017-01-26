// module.exports = require('./config/karma.conf.js');

var webpackConfig = require('./webpack.test');

module.exports = function (config) {
  var _config = {
    basePath: '',

    frameworks: ['jasmine'],

    files: [
      { pattern: 'karma-test-shim.js', watched: false }
    ],

    preprocessors: {
      './karma-test-shim.js': ['webpack', 'sourcemap']
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      stats: 'errors-only'
    },

    plugins: [
      require("karma-webpack"),
      require("karma-sourcemap-loader"),
      require("karma-phantomjs-launcher"),
      require("karma-chrome-launcher"),
      require("karma-jasmine")
    ],

    webpackServer: {
      noInfo: true
    },

    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true
  };

  config.set(_config);
};
