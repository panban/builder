'use strict';

module.exports = () => {
  $.gulp.task('clean', () => {
    return $.del([ $.config.output, $.config.temp ]);
  });
};
