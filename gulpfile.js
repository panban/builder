var $ = {
  package: require('./package.json'),
  config: require('./project/config.js'),
  path: {
    system: require('./project/path.system.js'),
    foundation: require('./project/path.foundation.js'),
    app: require('./project/path.app.js'),
    sass: require('./project/path.sass.js'),
    sprite: require('./project/path.sprite.js'),
    template: require('./project/path.template.js'),
    task: require('./project/path.task.js')
  },
  browserSync: require('browser-sync'),
  sequence: require('run-sequence'),
  rimraf: require('rimraf'),
  gulp: require('gulp'),
  merge: require('merge-stream'),
  $gulp: require('gulp-load-plugins')({
    lazy: false,
    rename: {
      'gulp-replace-task': 'replace',
      'gulp.spritesmith': 'spritesmith'
    }
  })
};

$.debug = true;

$.path.task.forEach(function(taskPath) {
  var builder = require(taskPath)($);
});

$.gulp.task('default', function() {
  $.sequence(
    'spritesmith:process',
    [
      'js:process',
      'js:foundation',
      'scss:process',
      'jade:process',
      'copy:resource'
    ],
    'service:server'
  );
});

$.gulp.task('build', function(cb) {
  $.debug = false;

  $.sequence(
    'service:clean',
    'spritesmith:process',
    'js:lint',
    [
      'js:release',
      'js:foundation',
      'scss:release',
      'jade:process',
      'copy:resource'
    ],
    'service:server',
    function(cb) {
      console.log('Built has been completed.');
    }
  );
});
