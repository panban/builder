'use strict';

module.exports = () => {
  let options = {
    includePaths: $.path.sass.app
  };

  $.gulp.task('sass', () => {
    return $.gulp.src('./source/style/app.scss')
      .pipe($.gp.if($.dev, $.gp.sourcemaps.init()))
      .pipe($.gp.sass(options)).on('error', $.gp.notify.onError({ title: 'Style' }))
      .pipe($.gp.autoprefixer({ browsers: $.config.autoprefixerConfig }))
      .pipe($.gp.if($.dev, $.gp.sourcemaps.write()))
      .pipe($.gp.if(!$.dev, $.gp.csso()))
      .pipe($.gp.if(!$.dev, $.gp.rename({ suffix: '.min' })))
      .pipe($.gulp.dest(`${$.config.root}/assets/css`))
      .pipe($.browserSync.stream());
  })
};
