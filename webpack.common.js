var webpack = require('webpack');
var path = require('path');
// var HtmlWebpackPlugin = require('html-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
  target: 'node',

  entry: {
    // vendor: './client/src/app/vendor.ts',
    // polyfills: './client/src/app/polyfills.ts',
    app: './client/src/app/main.ts'
  },

  resolve: {
    extensions: [
      '.js',
      '.ts'
    ]
  },

  module: {
    loaders: [
      //JS LOADER
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          './client/src/app'
        ]
      },
      //TS LOADER
      {
        test: /\.ts$/,
        loaders: [
          'awesome-typescript-loader',
          'angular2-template-loader',
          'angular2-router-loader'
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.(scss)$/,
        loaders: [
          'raw-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        resolve: {},
        ts: {
          configFileName: 'tsconfig.json'
        },
        tslint: {
          configuration: require('./tslint.json')
        }
      }
    })

    // new webpack.optimize.CommonsChunkPlugin({
    //   name: ['app', 'vendor', 'polyfills']
    // }),

    // new HtmlWebpackPlugin({
    //   template: './server/views/index.html'
    // })
  ]
};
