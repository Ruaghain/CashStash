var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.config.common.js');

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',

  output: {
    path: './dist/js/app',
    publicPath: "/js/app/",
    filename: 'bundle.js',
    chunkFilename: '[id].chunk.js'
  }
});
