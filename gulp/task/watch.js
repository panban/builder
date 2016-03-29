'use strict';

module.exports = function($) {
  $.gulp.task('watch', function() {
    $.gulp.watch('./source/style/**/*.scss', $.gulp.series('sass'));
    $.gulp.watch('./source/template/**/*.jade', $.gulp.series('jade'));
  });
};
