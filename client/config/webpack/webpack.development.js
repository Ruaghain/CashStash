var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var commonConfig = require('./webpack.common.js');
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
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // all options are optional
        filename: '[name].css',
        chunkFilename: '[id].css',
        ignoreOrder: false, // Enable to remove warnings about conflicting order
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html'
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
