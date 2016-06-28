'use strict';

const log = require('gulplog');
const webpack = require('webpack');
const cwd = process.cwd();

module.exports = () => {

  $.gulp.task('js:process', cb => {
    let config = require(`${cwd}/webpack.config.js`);

    function done(err, stats) {
      if (err) {
        return;
      }

      log[stats.hasErrors() ? 'error': 'info'](stats.toString({
        colors: true
      }));

      cb();
    }

    webpack(config, done);
  });
};
