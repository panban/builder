'use strict';

const webpack = require('webpack');
const gutil = require('gulp-util');

module.exports = () => {

  $.gulp.task('webpack:dll', cb => {
    const config = require(`${process.cwd()}/internals/webpack/webpack.config.dll.js`);

    function done(error, stats) {
      if (error) {
        throw new gutil.PluginError('webpack', error);
      }

      gutil.log('[webpack]', stats.toString({
        colors: true,
        chunks: false
      }));


      cb();
    }

    webpack(config, done);
  });
};
