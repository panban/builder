(function() {
  'use strict';

  var builder = function($) {

    $.gulp.task('template:copy', function() {

      return $.gulp.src($.path.template)
        .pipe($.$gulp.changed($.config.root + '/templates'))
        .pipe($.gulp.dest($.config.root + '/templates'));
    });
  };

  module.exports = builder;
})();