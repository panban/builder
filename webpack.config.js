'use strict';

const path = require('path');
const webpack = require('webpack');

let modulesDirectories = ['node_modules'];
let inputPath = path.join(__dirname, './source/js/');

let plugins = [
  new webpack.NoErrorsPlugin(),
  new webpack.optimize.CommonsChunkPlugin('foundation', 'foundation.js'),
  new webpack.DefinePlugin({
    NODE_ENV: JSON.stringify($.dev ? 'development': 'production')
  })
];
let loaders = [
  {test: /\.html?$/, loader: 'ngtemplate?relativeTo=' + inputPath + '!html'},
  { test: /\.json$/, loader: 'json' },
  {
    test: /\.js$/,
    include: path.join(__dirname, 'source/js'),
    loader: 'babel',
    query: {
      presets: ['es2015'],
      plugins: ['transform-runtime']
    }
  }
];

if (!$.dev) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      warnings: false,
      drop_console: true
    })
  );
}

module.exports = {
    context: path.resolve(__dirname, 'source/js'),

    entry: {
      app: './app.js',
      foundation: $.path.foundation
    },

    output: {
      path: path.join(__dirname, $.config.root, '/assets/js'),
      filename: "app.js"
    },

    watch: $.dev,

    watchOptions: {
      aggregateTimeout: 100
    },

    devtool: $.dev ? 'cheap-module-inline-source-map' : null,

    module: {
      loaders,
      noParse: []
    },

    plugins,

    resolve: {
      modulesDirectories,
      extensions: ['', '.js'],
      alias: {
      }
    },

    resolveLoader: {
      modulesDirectories,
      moduleTemplate: ['*-loader', '*'],
      extensions: ['', '.js']
    }
};
