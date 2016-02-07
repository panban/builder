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
        online: true,
        server: {
          baseDir: $.config.root
        }
      };

      var buildWatcher = function(match, taskName, enableReload) {
        $.browserSync.reload
        return {
          match: match,
          fn: function(event, file) {
            $.gulp.start(taskName, function() {
              if (!enableReload) {
                $.browserSync.reload();
              }
            });
          },
          options: {
            ignoreInitial: true
          }
        };
      };

      //options.files.push(buildWatcher(['./source/images/**/*.{png|jpg|gif}'], 'copy:image'));
      options.files.push(buildWatcher($.path.sprite, 'spritesmith:process'));
      options.files.push(buildWatcher($.path.app, 'js:process'));
      options.files.push(buildWatcher(['./source/**/*.scss'], 'scss:process', true));
      options.files.push(buildWatcher(['./source/templates/**/*.jade'], 'jade:process'));

      $.browserSync(options, function(err, bs) {
        console.log(bs.options.getIn(['urls', 'local']));
      });
    });
  };

  module.exports = builder;
})();
