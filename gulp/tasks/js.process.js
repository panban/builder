'use strict';

const webpack = require('webpack');
const gutil = require('gulp-util');
const cwd = process.cwd();

module.exports = () => {

  $.gulp.task('js:process', cb => {
    const config = require(`${cwd}/webpack.config.js`);

    function done(error, stats) {
      if (error) {
        throw new gutil.PluginError('webpack', error);
      }

      gutil.log('[webpack]', stats.toString({ colors: true }));

      cb();
    }

    webpack(config, done);
  });
};
