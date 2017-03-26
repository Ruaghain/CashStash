var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var helpers = require('./../helpers');

module.exports = {
  entry: {
    'polyfills': './client/src/app/polyfills.ts',
    'vendor': './client/src/app/vendor.ts',
    'app': './client/src/app/main.ts'
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
          {
            loader: 'awesome-typescript-loader',
            options: { configFileName: helpers.root('tsconfig.json') }
          },
          // 'awesome-typescript-loader',
          'angular2-template-loader',
          'angular2-router-loader'
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
      ,
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader?name=assets/[name].[hash].[ext]'
      }
      ,
      {
        test: /\.(scss)$/,
        exclude: [/\.global\.scss$/],
        loaders: [
          'raw-loader',
          'sass-loader'
        ]
      }
      ,
      {
        test: /\.global\.scss$/,
        loaders: [
          'style-loader',
          'raw-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      helpers.root('./client/src'), // location of your src
      {} // a map of your routes
    ),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),
    new HtmlWebpackPlugin({
      template: './server/views/index.html'
    })
  ]
}
;
