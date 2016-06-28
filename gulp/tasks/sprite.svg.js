'use strict';

module.exports = function() {
  $.gulp.task('sprite:svg', function() {
    let svgminConfig = { js2svg: { pretty: true } };

    let cheerioConfig = {
      run: function($) {
        $('[fill]').removeAttr('fill');
        $('[stroke]').removeAttr('stroke');
        $('[style]').removeAttr('style');
      },
      parserOptions: { xmlMode: true }
    };

    let svgSpriteConfig = {
      mode: {
        symbol: {
          sprite: "../sprite.svg"
        }
      }
    };

    return $.gulp.src('./source/icons/*.svg')
      .pipe($.gp.svgmin(svgminConfig))
      .pipe($.gp.cheerio(cheerioConfig))
      .pipe($.gp.replace('&gt;', '>'))
      .pipe($.gp.svgSprite(svgSpriteConfig))
      .pipe($.gulp.dest($.config.root + '/assets/sprite'));
  });
};
