'use strict'

const btc = require('./')
const { test } = require('tap')

const val = 'okay'
const err = new Error('Boom!!')
const ctx = {}

function success(x) {
  return x
}

function failure() {
  throw err
}

function wrapPromise(fn) {
  return (...args) => new Promise(resolve => resolve(fn.apply(this, args)))
}

function callCallbackWithSuccess(x, cb) {
  setTimeout(() => cb(null, x))
}

function callCallbackWithFailure(x, cb) {
  setTimeout(() => cb(err))
}

function assertContext(t, f) {
  return function () {
    t.equal(this, ctx, 'should be called with specified context')
    return f.apply(this, arguments)
  }
}

test('basic', (t) => {
  t.equal(btc(success).name, success.name, 'should retain the original function name')

  t.deepEqual(btc(success)(val), [null, val])
  t.deepEqual(btc(failure)(val), [err])

  t.end()
})

test('with context', (t) => {
  t.deepEqual(btc(assertContext(t, success)).call(ctx, val), [null, val])
  t.deepEqual(btc(assertContext(t, failure)).call(ctx, val), [err])

  t.end()
})

test('async/await', async (t) => {
  t.deepEqual(await btc(wrapPromise(success))(val), [null, val])
  t.deepEqual(await btc(wrapPromise(failure))(val), [err])

  t.end()
})

test('async/await with context', async (t) => {
  t.deepEqual(await btc(assertContext(t, wrapPromise(success))).call(ctx, val), [null, val])
  t.deepEqual(await btc(assertContext(t, wrapPromise(failure))).call(ctx, val), [err])

  t.end()
})

test('promisify', async (t) => {
  t.equal(
    btc.promisify(callCallbackWithSuccess).name,
    callCallbackWithSuccess.name,
    'should retain the original function name'
  )

  t.deepEqual(await btc.promisify(callCallbackWithSuccess)(val), [null, val])
  t.deepEqual(await btc.promisify(callCallbackWithFailure)(val), [err])

  t.end()
})

test('promisify with context', async (t) => {
  t.deepEqual(await btc.promisify(assertContext(t, callCallbackWithSuccess)).call(ctx, val), [null, val])
  t.deepEqual(await btc.promisify(assertContext(t, callCallbackWithFailure)).call(ctx, val), [err])

  t.end()
})
