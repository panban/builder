'use strict';

module.exports = () => {
  $.gulp.task('clean', cb => {
    return $.rimraf($.config.output, cb);
  });
};
