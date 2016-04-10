'use strict';

module.exports = () => {
  $.gulp.task('clean', cb => {
    return $.rimraf($.config.root, cb);
  });
};
