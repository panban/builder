'use strict';

const webpack = require('webpack');
const path = require('path');

const input = path.join(__dirname, './source/js/');
const output = path.join(__dirname, $.config.output, '/assets/js');

const config = {

  context: input,

  entry: {
    app: './index.js',
  },

  output: {
    path: output,
    filename: '[name].js'
  },

  watch: $.dev,

  watchOptions: {
    aggregateTimeout: 100
  },

  devtool: $.dev ? 'inline-source-map' : undefined,

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: input,
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'react'],
          plugins: ['transform-runtime']
        }
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  plugins: [
    new webpack.DllReferencePlugin({
      context: process.cwd(),
      manifest: require(`${$.config.temp}/foundation-manifest.json`)
    }),

    new webpack.NoErrorsPlugin(),

    new webpack.DefinePlugin({ NODE_ENV: JSON.stringify($.dev ? '__DEV__' : '__PROD__') }),
  ]
};

if (!$.dev) {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      warnings: false,
      drop_console: true
    })
  );
}

module.exports = config;
