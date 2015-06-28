'use strict';

var gulp = require('gulp-help')(require('gulp'));
var fs = require('fs');
var args = require('yargs').argv;

var basedir = process.env.PWD;
var gulpdir = basedir + '/gulp';

var config = {
  basedir: basedir,
  outdir: basedir + '/lib',
  gulpdir: gulpdir,
  taskdir: gulpdir + '/tasks',
  args: args,
  CI: !!process.env.TRAVIS,
  src: {
    in: 'src/**/*.js',
    out: 'locator.js',
    main: 'src/locator.js',
    root: basedir + '/src'
  },
  test: {
    in: 'spec/**/*.js'
  }
};

var tasks = fs.readdirSync(config.taskdir);
tasks.forEach(function (task) {
  if (~task.indexOf('.js')) {
    require(config.taskdir + '/' + task)(gulp, config);
  }
});
