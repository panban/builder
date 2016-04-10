'use strict';

module.exports = () => {
  $.gulp.task('serve', () => {
    $.browserSync.init({
      open: false,
      server: $.config.root
    });

    $.browserSync.watch([`${$.config.root}/**/*.*`, '!**/*.css'], $.browserSync.reload);
  });
};
