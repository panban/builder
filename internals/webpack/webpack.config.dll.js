'use strict';

const webpack = require('webpack');
const output = `${process.cwd()}/build/assets/js`;

const config = {

  entry: {
    foundation: $.path.dll
  },

  output: {
    filename: '[name].js',
    path: output,
    library: '__[name]__'
  },

  plugins: [new webpack.DllPlugin({
    path: `${process.cwd()}/temp/[name]-manifest.json`,
    name: '__[name]__'
  })]
};

module.exports = config;
