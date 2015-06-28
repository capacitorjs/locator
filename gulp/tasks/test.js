'use strict';

var karma = require('karma').server;
var karmaConf = require('./support/karma.conf');

module.exports = function (gulp, config) {
  gulp.task('test', 'Run tests in Chrome', function (done) {
    karma.start(karmaConf(config), done);
  }, {
    options: {
      dev: 'Leave browser open for debugging, watching for file changes'
    }
  });
};
