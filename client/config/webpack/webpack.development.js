var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var helpers = require('../helpers');

module.exports = function (env) {
  return webpackMerge(commonConfig(env), {

    devtool: 'cheap-module-eval-source-map',

    output: {
      path: helpers.root('dist-dev'),
      filename: '[name].bundle.js',
      chunkFilename: '[id].chunk.js',
      publicPath: ''
    },

    plugins: [
      new ExtractTextPlugin('[name].css'),
      new HtmlWebpackPlugin({
        template: './src/index.html'
      }),
      new CleanWebpackPlugin(['dist-dev'], {
        root: helpers.root('./'),
        verbose: true
      })
    ],

    devServer: {
      contentBase: helpers.root('dist-dev'),
      historyApiFallback: true,
      inline: true,
      port: 8000,
      stats: 'minimal'
    }
  })
};
