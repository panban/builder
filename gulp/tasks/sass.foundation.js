'use strict';

module.exports = () => {
  let options = {
    includePaths: $.path.sass.foundation
  };

  $.gulp.task('sass:foundation', () => {
    return $.gulp.src('./source/style/foundation.scss')
      .pipe($.gp.sass(options)).on('error', $.gp.notify.onError({ title: 'Style' }))
      .pipe($.gp.if(!$.dev, $.gp.csso()))
      .pipe($.gp.if(!$.dev, $.gp.rename({ suffix: '.min' })))
      .pipe($.gulp.dest(`${$.config.root}/assets/css`));
  })
};
