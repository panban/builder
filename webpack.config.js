'use strict';

const path = require('path');
const webpack = require('webpack');
const validate = require('webpack-validator');

const nodeModulesDirectories = path.join(__dirname, 'node_modules');
const modulesDirectories = [nodeModulesDirectories];
const inputPath = path.join(__dirname, './source/js/');

const plugins = [

  new webpack.NoErrorsPlugin(),

  new webpack.optimize.CommonsChunkPlugin('foundation', 'foundation.js'),

  new webpack.DefinePlugin({ NODE_ENV: JSON.stringify($.dev ? '__DEV__': '__PROD__') }),

  new webpack.ProvidePlugin({ $: 'jquery' })
];

const loaders = [

  { test: /\.html$/, loader: `ngtemplate?relativeTo=${inputPath}!html` },

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

const webpackConfig = {

  context: path.resolve(__dirname, 'source/js'),

  entry: {
    app: './app.js',
    foundation: []
  },

  output: {
    path: path.join(__dirname, $.config.root, '/assets/js'),
    filename: '[name].js'
  },

  watch: $.dev,

  watchOptions: {
    aggregateTimeout: 100
  },

  devtool: $.dev ? 'inline-source-map' : undefined,

  module: {
    loaders,
    noParse: []
  },

  plugins,

  resolve: {
    modulesDirectories,
    extensions: ['', '.js'],
    alias: {}
  },

  resolveLoader: {
    modulesDirectories,
    moduleTemplates: ['*-loader', '*'],
    extensions: ['', '.js']
  }
};

$.path.foundation.forEach((dependency) => {
  const dependencyName = dependency.split('/')[0];
  const dependencyPath = path.resolve(nodeModulesDirectories, dependency);

  webpackConfig.resolve.alias[dependencyName] = dependencyPath;
  webpackConfig.module.noParse.push(dependencyPath);
  webpackConfig.entry.foundation.push(dependencyName);
});

module.exports = validate(webpackConfig);
