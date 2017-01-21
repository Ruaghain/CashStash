var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',

  output: {
    path: helpers.root('dist', 'js'),
    publicPath: 'dist/js',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  plugins: [
    //   new ExtractTextPlugin('[name].css')
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      './client/src'), // location of your src
  ],

  devServer: {
    historyApiFallback: true,
    stats: 'minimal'
  }
});
