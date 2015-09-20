(function() {
  'use strict';

  var builder = function($) {

    $.gulp.task('template:process', function() {
      if ($.debug) {
        $.preprocess.options.context.suffix = '';
      }

      return $.gulp.src('./source/index.html')
        .pipe($.$gulp.preprocess($.preprocess.options))
        .pipe($.gulp.dest($.config.root));
    });
  };

  module.exports = builder;
})();