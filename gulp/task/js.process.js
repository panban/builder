'use strict';

let path = require('path'),
    log = require('gulplog');

module.exports = function($) {

  $.gulp.task('js.process', function(cb) {
    let config = $.webpackConfigFn($);
    
    function done(err, stats) {
      if (err) {
        return;
      }

      log[stats.hasErrors() ? 'error': 'info'](stats.toString({
        colors: true
      }));

      cb();
    }

    $.webpack(config, done);
  });
};
