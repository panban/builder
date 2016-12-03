'use strict';

const webpack = require('webpack');
const output = `${__dirname}/build/assets/js`;

const config = {

  entry: {
    foundation: $.path.foundation
  },

  output: {
    filename: '[name].js',
    path: output,
    library: '__[name]__'
  },

  plugins: [ new webpack.DllPlugin({
    path: `${output}/[name]-manifest.json`,
    name: '__[name]__'
  })]
};

module.exports = config;
