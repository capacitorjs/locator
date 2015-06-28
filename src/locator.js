'use strict';

import isFunction from 'lodash.isfunction';

/**
 * Locator is a basic service-locator,
 * capable of registering and retrieving modules, both by type and by name.
 *
 * essentially a `Map` with some extra features
 */
export default class Locator {
  constructor() {
    this._modules = new Map();
  }

  // Register a specific value with the given key
  set(identifier, instance) {
    this._modules.set(identifier, instance);
  }

  // Return the value associated with the key
  locate(identifier) {
    return this._modules.get(identifier);
  }

  // Return the value associated with the key
  // If the given module is not present, and the given Identifier is a function,
  // instantiate a new instance of the constructor function, store it, and return it.
  // In order for this to work, the constructor must be able to work without any arguments.
  get(Identifier) {
    let module = this.locate(Identifier);
    if (module == null && isFunction(Identifier)) {
      module = new Identifier();
      this.set(Identifier, module);
    }
    return module;
  }

  // A static instance for convenience
  static instance() {
    let instance = this._staticInstance;
    if (!instance) {
      instance = new this();
      this._staticInstance = instance;
    }
    return instance;
  }

  // Proxy `set` on the static instance
  static set(identifier, instance) {
    return this.instance().set(identifier, instance);
  }

  // Proxy `locate` on the static instance
  static locate(identifier) {
    return this.instance().locate(identifier);
  }

  // Proxy `get` on the static instance
  static get(identifier) {
    return this.instance().get(identifier);
  }

  // For testing purposes
  // Reset the singleton instance
  static __reset() {
    this._staticInstance = null;
  }
}
