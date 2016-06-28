'use strict';

module.exports = () => {
  $.gulp.task('js:lint', () => {
    return $.gulp.src($.path.app)
      .pipe($.gp.eslint())
      .pipe($.gp.eslint.format());
  })
};
