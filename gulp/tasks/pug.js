'use strict';

module.exports = () => {
  const patterns = [];

  $.gulp.task('pug', () => {
    patterns.push({ match: '%=suffix=%', replace: $.dev ? '' : '.min' });
    patterns.push({ match: '%=version=%', replace: $.dev ? '' : `?rel=${$.package.version}` });

    return $.gulp.src('./source/template/pages/**.pug')
      .pipe($.gp.pug({ pretty: true }))
      .on('error', $.gp.notify.onError(error => ({
        title: 'Pug',
        message: error.message
      })))
      .pipe($.gp.replaceTask({ patterns, usePrefix: false }))
      .pipe($.gulp.dest($.config.output));
  });
};
