var webpack = require('webpack');
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
            'angular2-template-loader',
            'angular2-router-loader'
          ]
        },
        {
          test: /\.html$/,
          loader: 'html-loader'
        },
        {
          test: /\.(scss)$/,
          exclude: [/\.global\.scss$/],
          loaders: [
            'to-string-loader',
            'css-loader',
            'resolve-url-loader',
            'sass-loader?sourceMap=true'
          ]
        },
        {
          test: /\.global\.scss$/,
          loaders: [
            'style-loader',
            'raw-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/,
          loader: 'url-loader?limit=8192&name=assets/[name].[ext]'
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
