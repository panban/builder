(function() {
  'use strict';

  var builder = function($) {

    $.gulp.task('scss:release', function() {
      var options = {
        includePaths: $.path.sass
      };

      return $.gulp.src('./source/scss/app.scss')
        .pipe($.$gulp.sass(options).on('error', $.$gulp.sass.logError))
        .pipe($.$gulp.autoprefixer({
          browsers: $.config.autoprefixerConfig
        }))
        .pipe($.$gulp.csso())
        .pipe($.$gulp.rename({
            suffix: '.min'
        }))
        .pipe($.gulp.dest($.config.root + '/assets/css'))
    });
  };

  module.exports = builder;
})();
