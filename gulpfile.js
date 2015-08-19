/*eslint-env node*/
'use strict';

var common = require('gulp-capacitorjs-common');
common.config.src.out = 'locator.js';
common.config.src.main = 'src/locator.js';
common.config.src.externals = {
  'lodash.isfunction': {
    amd: 'lodash.isfunction',
    commonjs: 'lodash.isfunction',
    commonjs2: 'lodash.isfunction'
  }
};
common.registerCommon();
