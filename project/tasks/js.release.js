(function() {
  'use strict';

  var builder = function($) {

    $.gulp.task('js:release', function () {

      return $.gulp.src($.path.app)

        .pipe($.$gulp.concat('app.min.js', {newLine: ';'}))
        .pipe($.$gulp.uglify({
          mangle: false
        }))
        .pipe($.gulp.dest($.config.root + '/assets/js'));
    });
  };

  module.exports = builder;
})();