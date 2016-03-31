'use strict';

let path = require('path');

module.exports = function($) {

  let config = {

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

    resolve: {
      modulesDirectories: ['node_modules'],
      extensions: ['', '.js'],
      alias: {}
    },

    resolveLoader: {
      modulesDirectories: ['node_modules'],
      moduleTemplate: ['*-loader', '*'],
      extensions: ['', '.js']
    },

    module: {

      loaders: [
        { test: /\.html$/, loader: 'raw' },
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
      ],

      noParse: []
    },

    plugins: [
      new $.webpack.NoErrorsPlugin(),
      new $.webpack.optimize.CommonsChunkPlugin('foundation', 'foundation.js'),
      new $.webpack.DefinePlugin({
        NODE_ENV: JSON.stringify($.dev ? 'development': 'production')
      })
    ]
  };

  if (!$.dev) {
    config.plugins.push(
      new $.webpack.optimize.UglifyJsPlugin({
        warnings: false,
        drop_console: true
      })
    );
  }

  return config;
};
