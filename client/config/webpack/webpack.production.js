var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var optimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('../helpers');

module.exports = function (env) {
  return webpackMerge(commonConfig(env), {
    devtool: 'source-map',

    output: {
      path: helpers.root('dist-prod'),
      filename: '[name].[hash].bundle.js',
      chunkFilename: '[id].[hash].chunk.js',
      publicPath: '/'
    },

    plugins: [
      new webpack.NoEmitOnErrorsPlugin(),
      new ExtractTextPlugin('[name].[hash].css'),
      new optimizeCssAssetsPlugin({
        cssProcessorOptions: {
          discardComments: {
            removeAll: true
          }
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        output: {
          comments: false
        },
        mangle: {
          keep_fnames: true
        },
        sourceMap: true
      }),
      new webpack.LoaderOptionsPlugin({
        htmlLoader: {
          minimize: false // workaround for ng2
        }
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        hash: true,
        chunks: ['polyfills', 'vendor', 'app'],
        minify: {
          collapseWhitespace: true
        }
      }),
      new CleanWebpackPlugin(['dist-prod'], {
        root: helpers.root('./'),
        verbose: true
      })
    ]
  })
};
