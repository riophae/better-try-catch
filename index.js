'use strict'

var isPromise = require('is-promise')

function onFulfilled(result) {
  return [null, result]
}

function onRejected(err) {
  return [err]
}

function betterTryCatch(fn) {
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

function promisify(fn) {
  return function () {
    var ctx = this
    var len = arguments.length
    var i
    var args = new Array(len)
    for (i = 0; i < len; i++)
      args[i] = arguments[i]

    return new Promise(function (resolve) {
      args[i] = function (err, result) {
        resolve(err ? [err] : [null, result])
      }
      fn.apply(ctx, args)
    })
  }
}

module.exports = betterTryCatch
module.exports.promisify = promisify
