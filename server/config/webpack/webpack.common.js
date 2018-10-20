var webpack = require('webpack');
var helpers = require('../helpers');

module.exports = function (env) {
  return {
    node: {
      net: 'empty',
      tls: 'empty',
      dns: 'empty',
      fs: 'empty'
    },

    entry: {
      'app': './src/app.ts'
    },

    resolve: {
      extensions: [
        '.js',
        '.ts'
      ]
    },

    module: {
      rules: [
        //JS LOADER
        {
          test: /\.js$/,
          loader: 'babel-loader',
        },
        //TS LOADER
        {
          test: /\.ts$/,
          use: [
            {
              loader: 'awesome-typescript-loader',
              options: { configFileName: helpers.root('tsconfig.json') }
            }
          ]
        }
      ]
    },
    optimization: {
      splitChunks: {
        chunks: "all"
      }
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(env),
      })
    ]
  }
};
