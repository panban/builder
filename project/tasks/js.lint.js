(function() {
  'use strict';

  var builder = function($) {

    $.gulp.task('js:lint', function () {

      return $.gulp.src($.path.app)
        .pipe($.$gulp.addSrc($.path.system))
        .pipe($.$gulp.eslint())
        .pipe($.$gulp.eslint.format())
        .pipe($.$gulp.eslint.failOnError())
        .on('error', function() {});
    });
  };

  module.exports = builder;
})();
