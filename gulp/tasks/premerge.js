'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

module.exports = function (gulp) {
  gulp.task('premerge', 'Lint and test, outputting a legible format', function (done) {
    runSequence('lint', 'test', done);
  });
};
