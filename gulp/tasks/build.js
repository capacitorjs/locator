'use strict';

var webpack = require('webpack-stream');
var webpackConf = require('./support/webpack.conf');

module.exports = function (gulp, config) {
  gulp.task('build', 'Bundle the library for distribution', function () {
    var webpackSettings = webpackConf(config);
    webpackSettings.entry = config.src.main;
    webpackSettings.externals = 'lodash.isfunction';
    return webpack(webpackSettings)
      .pipe(gulp.dest(config.outdir));
  });
};
