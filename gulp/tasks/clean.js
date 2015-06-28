'use strict';

var del = require('del');

module.exports = function (gulp, options) {
  gulp.task('clean', 'Remove generated files', function (done) {
    del([options.outdir], done);
  });
};
