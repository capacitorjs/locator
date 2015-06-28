[![Build Status](https://travis-ci.org/capacitorjs/locator.svg?branch=master)](https://travis-ci.org/capacitorjs/locator)

# locator
A light-weight service locator for IoC in JavaScript

## Requirements
Locator requires an implementation of `Map`, which is available as a polyfill from `babel-core`

## Usage

Use a Locator to dynamically retrieve shared instances of services and othe components.
The Locator is capable of registering modules both by type (e.g. constructor), as well as by name.

```js
const locator = new Locator();
const myClass = new MyClass(options);
locator.set(MyClass, myClass);
locator.locate(MyClass) === myClass; // true
```

Additionally, Locator provides the `get` option, which will return a registered instance, or a new instance,
if one hasn't been registered yet.

```js
locator.locate(MyNewClass); // undefined
const myNewClass = locator.get(MyNewClass); // result of `new MyNewClass()`
const myNewClass2 = locator.locate(MyNewClass)
myNewClass === myNewClass2 // true

// Alternatively, register names
const myOtherClass = new MyOtherClass();
locator.set('my-other-class', myOtheClass);
locator.locate('my-other-class', MyOtherCLass);
```

The common use-case for a service locator is to use a single locator instance for every service.
To this end, Locator provides a singleton instance and proxy methods on the Locator class itself.

```js
Locator.instance() // singleton instance of locator
Locator.set(MyClass, myClass);
Locator.locate(MyClass); // myClass
Locator.get(MyOtherClass);
```

### Referential equality

Under the covers, Locator uses an es2015 `Map`, so values are accessed by reference,
as opposed to regular javascript objects, which store objects by the result of their `toJSON()`

```js
const a = {};
const b = {};

const simple = {};
simple[a] = '1';
simple[b] = '2';
simple[a] === simple[b] === '2'; // true

const locator = new Locator();
locator.set(a, '1');
locator.set(b, '2');

locator.get(a) === '1'; // true
locator.get(b) === '2'; // true
```

This behavior lends itself nicely to storage via enum-like constants.

```js
const MY_FIRST_CLASS = {};
const MY_SECOND_CLASS = {};

locator.set(MY_FIRST_CLASS, new MyClass(1));
locator.set(MY_SECOND_CLASS, new MyClass(2));
```

## Testing

When testing components that use the locator, simply register mocks with the locator.
After your test, call `__reset()` to clear the mocks.

```js
beforeEach(function () {
  Locator.register(MyClassDependency, mockDependency);
  var myClass = new MyClass(); // will use the registered mock dependency
});

afterEach(function () {
  Locator.__reset();
});
```
