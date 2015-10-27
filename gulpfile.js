var $ = {
  package: require('./package.json'),
  config: require('./project/config.js'),
  path: {
    system: require('./project/path.system.js'),
    foundation: require('./project/path.foundation.js'),
    app: require('./project/path.app.js'),
    sass: require('./project/path.sass.js'),
    template: require('./project/path.template.js'),
    task: require('./project/path.task.js')
  },
  browserSync: require('browser-sync'),
  sequence: require('run-sequence'),
  rimraf: require('rimraf'),
  gulp: require('gulp'),
  $gulp: require('gulp-load-plugins')({
    lazy: false,
    rename: {}
  })
};

$.debug = true;
$.preprocess = {
  options: {
    context: {
      version: '?rel=' + $.package.version,
      suffix: '.min',
      debug: $.debug
    }
  }
};

$.path.task.forEach(function(taskPath) {
  var builder = require(taskPath)($);
});

$.gulp.task('default', function() {
  $.sequence(
    [
      'js:process',
      'js:foundation',
      'scss:process',
      'copy:resource',
      'copy:things'
    ],
    'service:server'
  );
});

$.gulp.task('build', function(cb) {
  $.debug = false;

  $.sequence(
    'service:clean',
    'js:lint',
    [
      'js:release',
      'js:foundation',
      'scss:release',
      'copy:resource',
      'copy:things'
    ],
    function(cb) {
      console.log('Built has been completed.');
    }
  );
});
