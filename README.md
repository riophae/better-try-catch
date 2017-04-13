# better-try-catch

Better exception handling with try-catch.

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
