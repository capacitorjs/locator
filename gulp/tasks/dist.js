'use strict';

module.exports = function (gulp) {
  gulp.task('dist', 'Ensure that the library is ready for distribution and build it', ['lint', 'test', 'build']);
};
