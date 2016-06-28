'use strict';

module.exports = () => {
  let patterns = [];

  $.gulp.task('pug', () => {
    patterns.push({match: '%=suffix=%', replace: $.dev ? '' : '.min'});
    patterns.push({match: '%=version=%', replace: $.dev ? '' : `?rel=${$.package.version}`});

    return $.gulp.src('./source/template/pages/**')
      .pipe($.gp.pug({ pretty: true }))
      .on('error', $.gp.notify.onError(error => ({
        title: 'Pug',
        message:  error.message
        })
      ))
      .pipe($.gp.replaceTask({ patterns: patterns, usePrefix: false }))
      .pipe($.gulp.dest($.config.root));
  });
};
