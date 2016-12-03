'use strict';

// PROJECT
// - - - - - - - - - - - - - - -
global.$ = {
  dev: true,
  package: require('./package.json'),
  config: require('./gulp/config'),
  path: {
    app: require('./gulp/paths/app.js'),
    tasks: require('./gulp/paths/tasks.js'),
    dll: require('./gulp/paths/dll.js'),
    sass: require('./gulp/paths/sass.js')
  },
  gulp: require('gulp'),
  del: require('del'),
  webpack: require('webpack'),
  browserSync: require('browser-sync').create(),
  gp: require('gulp-load-plugins')({
    rename: {
      'gulp-replace-task': 'replaceTask'
    }
  })
};

// TASKS
// - - - - - - - - - - - - - - -
$.path.tasks.forEach(taskPath =>  require(taskPath)());

$.gulp.task('default', $.gulp.series(
  'clean',
  'webpack:dll',
  $.gulp.parallel(
    'sass',
    'pug',
    'webpack:app',
    'copy:fonts',
    'sprite:svg'
  ),
  $.gulp.parallel(
    'watch',
    'server'
  )
));

$.gulp.task('build', $.gulp.series(
  cb => {$.dev = false; cb()},
  'clean',
  'webpack:dll',
  $.gulp.parallel(
    'sass',
    'pug',
    'webpack:app',
    'copy:fonts',
    'sprite:svg'
  )
));
