'use strict';

module.exports = function($) {
  var patterns = [];

  $.gulp.task('jade', function() {
    patterns.push({match: '%=suffix=%', replace: $.dev ? '' : '.min'});
    patterns.push({match: '%=version=%', replace: $.dev ? '' : '?rel=' + $.package.version});

    return $.gulp.src($.path.template, {since: $.gulp.lastRun('jade')})
      .pipe($.gp.jade({ pretty: true }))
      .on('error', $.gp.notify.onError({
        title: 'Jade',
        message: function(error) {
          return error.message;
        }
      }))
      .pipe($.gp.replace({ patterns: patterns, usePrefix: false }))
      .pipe($.gulp.dest($.config.root));
  });
};
