var webpack = require('webpack');
var path = require('path');

module.exports = {
  target: 'node',

  entry: {
    app: path.resolve(__dirname, './client/src/app/main.ts')
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
          path.resolve(__dirname, 'client/')
        ]
      },
      //TS LOADER
      {
        test: /\.ts$/,
        loaders: [
          'awesome-typescript-loader',
          'angular2-template-loader',
          'angular2-router-loader'
        ],
        // loader: 'awesome-typescript-loader',
        // query: {
        //   tsconfig: path.resolve(__dirname, 'tsconfig.json')
        // },
        include: [
          path.resolve(__dirname, 'client/')
        ]
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.(scss|sass)$/,
        loaders: ['raw', 'sass'],
        include: [
          path.resolve(__dirname, 'node_modules/bootstrap-sass/assets/stylesheets/*.scss'),
          path.resolve(__dirname, 'client')
        ]
      }
    ]
  },

  plugins: [
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      './client/src' // location of your src
    )
  ],

  devtool: 'cheap-module-eval-source-map',

  output: {
    path: './dist/js/app',
    publicPath: "/js/app/",
    filename: 'bundle.js',
    chunkFilename: '[id].chunk.js'
  }

};
