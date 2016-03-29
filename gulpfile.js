'use strict';

// PROJECT
// - - - - - - - - - - - - - - -
let $ = {
  dev: true,
  package: require('./package.json'),
  config: require('./gulp/config'),
  path: {
    app: require('./gulp/path.app'),
    task: require('./gulp/path.tasks'),
    foundation: require('./gulp/path.foundation'),
    template: require('./gulp/path.template'),
    sass: require('./gulp/path.sass')
  },
  gulp: require('gulp'),
  rimraf: require('rimraf'),
  webpack: require('webpack'),
  webpackConfigFn: require('./webpack.config'),
  browserSync: require('browser-sync').create(),
  gp: require('gulp-load-plugins')({
    rename: {
      'gulp-replace-task': 'replace'
    }
  })
};

// TASKS
// - - - - - - - - - - - - - - -
$.path.task.forEach(taskPath => require(taskPath)($));

$.gulp.task('default', $.gulp.series(
  'clean',
  $.gulp.parallel(
    'sass',
    // 'sass.foundation',
    'jade',
    'js.foundation',
    'js.process'
  ),
  $.gulp.parallel(
    'watch',
    'serve'
  )
));

$.gulp.task('build', $.gulp.series(
  cb => {$.dev = false; cb()},
  'clean',
  $.gulp.parallel(
    'sass',
    // 'sass.foundation',
    'jade',
    'js.foundation',
    'js.process'
  )
));