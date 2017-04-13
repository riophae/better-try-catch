# better-try-catch

[![npm version](https://badge.fury.io/js/better-try-catch.svg)](https://badge.fury.io/js/better-try-catch) [![Build Status](https://travis-ci.org/riophae/better-try-catch.svg)](https://travis-ci.org/riophae/better-try-catch) [![Dependency Status](https://david-dm.org/riophae/better-try-catch.svg)](https://david-dm.org/riophae/better-try-catch) [![Coverage Status](https://codecov.io/gh/riophae/better-try-catch/branch/master/graph/badge.svg)](https://codecov.io/gh/riophae/better-try-catch)

Try-catch wrapper for easy error handling.

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
async function fn() {
  var [err, result] = await btc(someFunctionThatReturnsPromise)(arg1, arg2)
  if (!err) {
    // ...
  }
}
```

## License

MIT License, Copyright (c) 2017 Riophae Lee
