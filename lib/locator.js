/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _lodashIsfunction = __webpack_require__(1);
	
	var _lodashIsfunction2 = _interopRequireDefault(_lodashIsfunction);
	
	/**
	 * Locator is a basic service-locator,
	 * capable of registering and retrieving modules, both by type and by name.
	 *
	 * essentially a `Map` with some extra features
	 */
	
	var Locator = (function () {
	  function Locator() {
	    _classCallCheck(this, Locator);
	
	    this._modules = new Map();
	  }
	
	  _createClass(Locator, [{
	    key: 'set',
	
	    // Register a specific value with the given key
	    value: function set(identifier, instance) {
	      this._modules.set(identifier, instance);
	    }
	  }, {
	    key: 'locate',
	
	    // Return the value associated with the key
	    value: function locate(identifier) {
	      return this._modules.get(identifier);
	    }
	  }, {
	    key: 'get',
	
	    // Return the value associated with the key
	    // If the given module is not present, and the given Identifier is a function,
	    // instantiate a new instance of the constructor function, store it, and return it.
	    // In order for this to work, the constructor must be able to work without any arguments.
	    value: function get(Identifier) {
	      var module = this.locate(Identifier);
	      if (module == null && (0, _lodashIsfunction2['default'])(Identifier)) {
	        module = new Identifier();
	        this.set(Identifier, module);
	      }
	      return module;
	    }
	  }], [{
	    key: 'instance',
	
	    // A static instance for convenience
	    value: function instance() {
	      var instance = this._staticInstance;
	      if (!instance) {
	        instance = new this();
	        this._staticInstance = instance;
	      }
	      return instance;
	    }
	  }, {
	    key: 'set',
	
	    // Proxy `set` on the static instance
	    value: function set(identifier, instance) {
	      return this.instance().set(identifier, instance);
	    }
	  }, {
	    key: 'locate',
	
	    // Proxy `locate` on the static instance
	    value: function locate(identifier) {
	      return this.instance().locate(identifier);
	    }
	  }, {
	    key: 'get',
	
	    // Proxy `get` on the static instance
	    value: function get(identifier) {
	      return this.instance().get(identifier);
	    }
	  }, {
	    key: '__reset',
	
	    // For testing purposes
	    // Reset the singleton instance
	    value: function __reset() {
	      this._staticInstance = null;
	    }
	  }]);
	
	  return Locator;
	})();
	
	exports['default'] = Locator;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = lodash.isfunction;

/***/ }
/******/ ]);
//# sourceMappingURL=locator.js.map