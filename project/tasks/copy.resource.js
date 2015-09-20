(function() {
  'use strict';

  var builder = function($) {

    $.gulp.task('copy:resource', function() {

      return $.gulp.src('./source/static/resources/**/*.*')
        .pipe($.$gulp.changed($.config.root))
        .pipe($.gulp.dest($.config.root))
    });
  };

  module.exports = builder;
})();