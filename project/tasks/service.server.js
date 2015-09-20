(function() {
  'use strict';

  var builder = function($) {
    $.gulp.task('service:server', function() {
      var options = {
        files: [],
        minify: false,
        logConnections: true,
        injectChanges: $.config.browserSyncConfig.injectChanges,
        open: $.config.browserSyncConfig.open,
        port: $.config.browserSyncConfig.port,
        tunnel: $.config.browserSyncConfig.tunnel,
        notify: $.config.browserSyncConfig.useNotifyInBrowser,
        server: {
          baseDir: $.config.root
        }
      };

      var buildWatcher = function(match, taskName) {
        return {
          match: match,
          fn: function(event, file) {
            $.gulp.start(taskName, function() {
              $.browserSync.reload();
            });
          },
          options: {
            ignoreInitial: true
          }
        };
      };

      options.files.push(buildWatcher(['./source/index.html'], 'template:process'));
      options.files.push(buildWatcher($.path.template, 'template:cache'));
      options.files.push(buildWatcher($.path.app, 'js:process'));
      options.files.push(buildWatcher(['./source/**/*.scss'], 'scss:process'));

      $.browserSync(options, function(err, bs) {
        console.log(bs.options.getIn(['urls', 'local']));
      });
    });
  };

  module.exports = builder;
})();
