var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common.js');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var helpers = require('../helpers');

module.exports = function (env) {
  return webpackMerge(commonConfig(env), {
    mode: "development",
    devtool: 'cheap-module-eval-source-map',

    output: {
      path: helpers.root('dist'),
      filename: '[name].bundle.js',
      chunkFilename: '[id].chunk.js',
      publicPath: ''
    },

    plugins: [
      new CleanWebpackPlugin(['dist'], {
        root: helpers.root('./'),
        verbose: true
      })
    ],

    devServer: {
      contentBase: helpers.root('dist'),
      historyApiFallback: true,
      inline: true,
      port: 3000,
      stats: 'minimal'
    }
  })
};
