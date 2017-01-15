module.exports = function (config) {
  config.set({
    basePath: '.',

    frameworks: ['jasmine'],

    plugins: [
      'karma-jasmine',
      'karma-coverage',
      'karma-chrome-launcher'
    ],

    files: [
      { pattern: './client/**/*.spec.ts', watched: false }
    ],

    preprocessors: {
      'dist/**/!(*spec).js': ['coverage']
    },

    // Coverage reporter generates the coverage
    reporters: [
      'dots',
      'coverage'
    ],

    port: 9876,

    coverageReporter: {
      reporters: [
        {
          type: 'json',
          subdir: '.',
          file: 'coverage-final.json'
        }
      ]
    },

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['Chrome'],

    singleRun: false
  });
};
