'use strict';

module.exports = function($) {
  $.gulp.task('js.process', function() {
    return $.gulp.src($.path.app)
      .pipe($.gp.if($.dev, $.gp.sourcemaps.init()))
      .pipe($.gp.concat('app.js'))
      .pipe($.gp.if($.dev, $.gp.sourcemaps.write()))
      .pipe($.gp.if(!$.dev, $.gp.uglify()))
      .pipe($.gp.if(!$.dev, $.gp.rename({ suffix: '.min' })))
      .pipe($.gulp.dest($.config.root + '/assets/js'))
  })
};
