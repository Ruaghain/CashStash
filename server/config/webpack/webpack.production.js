var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('../helpers');

module.exports = function (env) {
  return webpackMerge(commonConfig(env), {
    mode: "production",
    devtool: 'source-map',

    output: {
      path: helpers.root('dist-prod'),
      filename: '[name].[hash].bundle.js',
      chunkFilename: '[id].[hash].chunk.js',
      publicPath: '/'
    },

    plugins: [
      new webpack.LoaderOptionsPlugin({
        htmlLoader: {
          minimize: false // workaround for ng2
        }
      }),
      new CleanWebpackPlugin(['dist-prod'], {
        root: helpers.root('./'),
        verbose: true
      })
    ]
  })
};
