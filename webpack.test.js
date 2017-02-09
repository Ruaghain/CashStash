var webpack = require('webpack');
var helpers = require('./helpers');

module.exports = {
  devtool: 'inline-source-map',

  resolve: {
    extensions: ['.ts', '.js']
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders:
          [
            'awesome-typescript-loader',
            'angular2-template-loader'
          ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'

      },
      {
        test: /\.scss$/,
        loaders: [ 'raw-loader', 'sass-loader' ]
      },
    ]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      helpers.root('./client/src'), // location of your src
      {} // a map of your routes
    )
  ]
};
