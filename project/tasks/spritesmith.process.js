(function() {
  'use strict';

  var builder = function($) {

    $.gulp.task('spritesmith:process', function() {

      var spriteData = $.gulp.src($.path.sprite)
        .pipe($.$gulp.spritesmith({
            imgName: 'sprite.png',
            cssName: '_sprite.scss',
            padding: 20
        }));


        var imgStream = spriteData.img
          // DEV: We must buffer our stream into a Buffer for `imagemin` 
          //.pipe(buffer())
          //.pipe(imagemin())
          .pipe($.gulp.dest($.config.root + '/assets/images'));

        var cssStream = spriteData.css
          //.pipe(csso())
          .pipe($.gulp.dest($.config.source + '/scss/sprites'));

        return $.merge(imgStream, cssStream);
    });
  };

  module.exports = builder;
})();
