(function() {
  'use strict';

  var builder = function($) {

    $.gulp.task('service:clean', function(cb) {
      return $.rimraf($.config.root, cb);
    });
  };

  module.exports = builder;
})();