(function() {
  'use strict';

  var builder = function($) {

    $.gulp.task('js:process', function() {

      return $.gulp.src($.path.app)
        .pipe($.$gulp.sourcemaps.init())
        .pipe($.$gulp.concat('app.js', {newLine: ';'}))
        .pipe($.$gulp.sourcemaps.write('maps/'))
        .pipe($.gulp.dest($.config.root + '/assets/js'));
    });
  };

  module.exports = builder;
})();