'use strict'

var isPromise = require('is-promise')

function onFulfilled(result) {
  return [ null, result ]
}

function onRejected(err) {
  return [ err ]
}

function getFnName(fn) {
  return (fn.name || '').replace(/\s|bound(?!$)/g, '')
}

function betterTryCatch(fn) {
  var name = getFnName(fn)

  return eval('(function ' + name + '() {\n' +
    '  try {\n' +
    '    var result = fn.apply(this, arguments)\n' +
    '    return isPromise(result)\n' +
    '      ? result.then(onFulfilled, onRejected)\n' +
    '      : [ null, result ]\n' +
    '  } catch (err) {\n' +
    '    return [ err ]\n' +
    '  }\n' +
    '})')
}

function promisify(fn) {
  var name = getFnName(fn)

  return eval('(function ' + name + '() {\n' +
    '  var self = this\n' +
    '  var len = arguments.length\n' +
    '  var i\n' +
    '  var args = new Array(len)\n' +
    '  for (i = 0; i < len; i++)\n' +
    '    args[i] = arguments[i]\n' +
    '  return new Promise(function (resolve) {\n' +
    '    args[i] = function callback(err, result) {\n' +
    '      resolve(err ? [ err ] : [ null, result ])\n' +
    '    }\n' +
    '    fn.apply(self, args)\n' +
    '  })\n' +
    '})')
}

module.exports = betterTryCatch
module.exports.promisify = promisify
