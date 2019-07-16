var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
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

    // config: {
    //   optimization: {
    //     minimize: true
    //   }
    // },

    plugins: [
      new webpack.NoEmitOnErrorsPlugin(),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // all options are optional
        filename: '[name].css',
        chunkFilename: '[id].css',
        ignoreOrder: false, // Enable to remove warnings about conflicting order
      }),
      new optimizeCssAssetsPlugin({
        cssProcessorOptions: {
          discardComments: {
            removeAll: true
          }
        }
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
      })
    ]
  })
};
