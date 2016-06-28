'use strict';

module.exports = () => {
  $.gulp.task('copy:fonts', () => {
    return $.gulp.src('./source/fonts/**')
      .pipe($.gulp.dest($.config.root + '/assets/fonts'));
  });
};
