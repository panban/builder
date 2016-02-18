'use strict';

var $ = {
  package: require('./package.json'),
  config: require('./gulp/config'),
  path: {
    task: require('./gulp/path.tasks'),
    template: require('./gulp/path.template'),
    foundation: require('./gulp/path.foundation'),
    app: require('./gulp/path.app')
  },
  gulp: require('gulp'),
  rimraf: require('rimraf'),
  browserSync: require('browser-sync').create(),
  gp: require('gulp-load-plugins')({
    rename: {
      'gulp-replace-task': 'replace'
    }
  })
};

$.path.task.forEach(function(taskPath) {
  require(taskPath)($);
});

$.dev = true;

$.gulp.task('default', $.gulp.series(
  'clean',
  $.gulp.parallel(
    'sass',
    'jade',
    'js.foundation',
    'js.process'
  ),
  $.gulp.parallel(
    'watch',
    'serve'
  )
));
