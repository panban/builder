(function() {
  'use strict';

  var builder = function($) {

    $.gulp.task('template:cache', function() {
      var options = {
        module: 'application.templates',
        standalone: true,
        moduleSystem: 'IIFE',
        root: 'templates'
      };

      return $.gulp.src($.path.template)
        .pipe($.$gulp.templateCache('app.templates.js', options))
        .pipe($.gulp.dest($.config.root + '/assets/js'));
    });
  };

  module.exports = builder;
})();
