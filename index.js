'use strict'

var isPromise = require('is-promise')

function onFulfilled(result) {
  return [null, result]
}

function onRejected(err) {
  return [err]
}

module.exports = function betterTryCatch(fn) {
  return function () {
    try {
      var result = fn.apply(this, arguments)
      return isPromise(result)
        ? result.then(onFulfilled, onRejected)
        : [null, result]
    } catch (err) {
      return [err]
    }
  }
}
