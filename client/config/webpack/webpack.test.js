var webpack = require('webpack');
var helpers = require('../helpers');

module.exports = {
  devtool: 'inline-source-map',

  resolve: {
    extensions: [
      '.js',
      '.ts'
    ]
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: [
          {
            loader: 'awesome-typescript-loader',
            options: { configFileName: helpers.root('tsconfig.json') }
          },
          'angular2-template-loader'
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'

      },
      {
        test: /\.scss$/,
        loaders: ['raw-loader', 'sass-loader']
      },
      {
        enforce: 'post',
        test: /\.ts$/,
        loader: 'istanbul-instrumenter-loader',
        exclude: [
          'node_modules',
          // 'testing/**/*.*',
          /\.spec\.ts$/
        ]
      }
    ],
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)@angular/,
      helpers.root('./src'),
      {} // a map of your routes
    )
  ]
};
