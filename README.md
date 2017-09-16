# better-try-catch

[![npm version](https://badge.fury.io/js/better-try-catch.svg)](https://badge.fury.io/js/better-try-catch) [![Build Status](https://travis-ci.org/riophae/better-try-catch.svg)](https://travis-ci.org/riophae/better-try-catch) [![Dependency Status](https://david-dm.org/riophae/better-try-catch.svg)](https://david-dm.org/riophae/better-try-catch) [![Coverage Status](https://codecov.io/gh/riophae/better-try-catch/branch/master/graph/badge.svg)](https://codecov.io/gh/riophae/better-try-catch)

Try-catch wrapper for easy error handling. Inspired by [await-to-js](https://github.com/scopsy/await-to-js).

## Installation

```bash
$ npm install better-try-catch
```

## Usage

```javascript
var btc = require('better-try-catch')

var [err, result] = btc(someFunction)(arg1, arg2)
if (!err) {
  // ...
}

// You can also use better-try-catch with async/await functions
async function example1() {
  var [err, result] = await btc(someFunctionThatReturnsPromise)(arg1, arg2)
  if (!err) {
    // ...
  }
}

// Or even use with functions that accept node-style callback:
async function example2() {
  var [err, result] = await btc.promisify(fs.readFile)('data.json', 'utf8')
}
```

## I didn't see it's "better?"

Consider a situation like this:

```javascript
try {
  doSomething()
} catch (err) {
  // The varaible `err` is only visible in the catch block
}
// With the code goes here, the variable `err` is no longer existing
// If we have to make sure there wasn't anything went wrong above
// How do we know that?
if (!err) {
  // ...
}
```

Humm, it should be not too hard to solve. After one or three minutes of thinking, we have the code rearranged to be like this:

```javascript
var err // Hoist the error variable declaration
try {
  doSomething()
} catch (ex) {
  err = ex // Note here
  // Also, we can not simply place the `if` statement inside the catch block
  // Since if no errors occured then the `if` statement will not execute at all
}
// Alright, this time we are able to safely access the error variable outside the try-catch block
if (!err) {
  // ...
}
```

Okay, seems the problem has gone, with the only exception that the code looks a little more messy now. C'mon! Can't we do it better? better-try-catch to the rescue™!

```javascript
var btc = require('better-try-catch')
// better-try-catch wraps the function and will catch errors for you
// The wrapped function will *always* return both error and value
// Which somewhat looks like the node-style callbacks
var [err, result] = btc(doSomething)()
// And that's all we have to do, as simple as you can see
if (!err) { // Was there anything went wrong?
  // Nope, we are perfectly sure that everthing is running well as expected! :D
}
```

## License

MIT License, Copyright (c) 2017 Riophae Lee
