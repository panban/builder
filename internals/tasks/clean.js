'use strict';

module.exports = () => {
  $.gulp.task('clean', () => {
    return $.del([ $.config.output, `${process.cwd()}/temp` ]);
  });
};
