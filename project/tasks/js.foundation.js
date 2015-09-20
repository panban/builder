(function() {
  'use strict';

  var builder = function($) {

    $.gulp.task('js:foundation', function() {

      return $.gulp.src($.path.foundation)
        .pipe($.$gulp.concat('foundation.min.js', {newLine: ';'}))
        .pipe($.$gulp.uglify().on('error', function(e) {
            console.log(e);
        }))
        .pipe($.gulp.dest($.config.root + '/assets/js'));
    });
  };

  module.exports = builder;
})();
