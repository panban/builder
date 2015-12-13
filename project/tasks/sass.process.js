(function() {
  'use strict';

  var builder = function($) {

    $.gulp.task('scss:process', function() {
      var options = {
        includePaths: $.path.sass
      };

      return $.gulp.src('./source/scss/app.scss')
        .pipe($.$gulp.sass(options).on('error', $.$gulp.sass.logError))
        .pipe($.$gulp.autoprefixer({
          browsers: $.config.autoprefixerConfig,
          cascade: true
        }))
        .pipe($.gulp.dest($.config.root + '/assets/css'))
        .pipe($.browserSync.stream());
    });
  };

  module.exports = builder;
})();