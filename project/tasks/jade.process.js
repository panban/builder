(function() {
  'use strict';

  var builder = function($) {

    var patterns = [];
    patterns.push({match: '%=version=%', replace: '?rel=' + $.package.version});

    $.gulp.task('jade:process', function() {
      if ($.debug) {
        patterns.push({match: '%=suffix=%', replace: ''});
      } else {
        patterns.push({match: '%=suffix=%', replace: '.min'});
      }

      return $.gulp.src($.path.template)
        .pipe($.$gulp.plumber())
        .pipe($.$gulp.jade({pretty: true}))
        .pipe($.$gulp.replace({
          patterns: patterns,
          usePrefix: false
        }))
        .pipe($.gulp.dest($.config.root));
    });
  };

  module.exports = builder;
})();