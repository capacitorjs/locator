'use strict';

var eslint = require('gulp-eslint');

module.exports = function (gulp, config) {
  gulp.task('lint', 'Lint source files', function () {
    return gulp.src([config.src.in, config.test.in])
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failOnError());
  });
};
