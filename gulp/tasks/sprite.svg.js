'use strict';

module.exports = () => {
  $.gulp.task('sprite:svg', () => {
    const svgminConfig = { js2svg: { pretty: true } };

    const cheerioConfig = {
      run($) {
        $('[fill]').removeAttr('fill');
        $('[stroke]').removeAttr('stroke');
        $('[style]').removeAttr('style');
      },
      parserOptions: { xmlMode: true }
    };

    const svgSpriteConfig = {
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
      .pipe($.gulp.dest($.config.output + '/assets/sprite'));
  });
};
