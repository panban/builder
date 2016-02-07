(function() {
  'use strict';

  var config = {

    root: './build',
    source: './source',

    autoprefixerConfig: ['last 3 version', '> 1%', 'ie 8', 'ie 9', 'Opera 12.1'],

    browserSyncConfig: {

      injectChanges: true,
      port: 8080,
      tunnel: null,
      open: false,
      useNotifyInBrowser: true
    }
  };

  module.exports = config;
})();
