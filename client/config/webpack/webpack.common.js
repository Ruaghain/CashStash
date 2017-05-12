var webpack = require('webpack');
var path = require('path');
var helpers = require('../helpers');

module.exports = function (env) {
  return {
    entry: {
      'polyfills': './src/app/polyfills.ts',
      'vendor': './src/app/vendor.ts',
      'app': './src/app/main.ts'
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
        },
        {
          test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
          loader: 'file-loader?name=assets/[name].[hash].[ext]'
        },
        {
          test: /\.(scss)$/,
          exclude: [/\.global\.scss$/],
          loaders: [
            'raw-loader',
            'sass-loader'
          ]
        },
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
        /angular(\\|\/)core(\\|\/)@angular/,
        helpers.root('./src')
      ),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(env),
        'process.env.SERVER_URL': JSON.stringify(process.env.SERVER_URL || 'http://localhost:3000/api/v1')
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: ['app', 'vendor', 'polyfills']
      })
    ]
  }
};
