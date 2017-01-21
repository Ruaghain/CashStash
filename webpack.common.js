var webpack = require('webpack');
// var HtmlWebpackPlugin = require('html-webpack-plugin');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
  target: 'node',

  entry: {
    // vendor: './client/src/app/vendor.ts',
    // polyfills: './client/src/app/polyfills.ts'
    // ,
    app: './client/src/app/main.ts'
  },

  resolve: {
    extensions: ['', '.js', '.ts']
  },

  module: {
    loaders: [
      //JS LOADER
      {
        test: /\.js$/,
        loader: 'babel',
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
        loader: 'html'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.(scss|sass)$/,
        exclude: helpers.root('src', 'app'),
        loaders: ['raw', 'sass'],
        include: [
          './node_modules/bootstrap-sass/assets/stylesheets/*.scss',
          './client/src/app'
        ]
      }
    ]
  },

  plugins: [
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: ['app', 'vendor', 'polyfills']
    // }),

    // new HtmlWebpackPlugin({
    //   template: './server/views/index.html'
    // })
  ]
};
