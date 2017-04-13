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

function assertContext(t, f) {
  return function () {
    t.equal(this, ctx)
    return f.apply(this, arguments)
  }
}

function isAsyncAwaitSupported() {
  try {
    eval('async function x() {}')
    return true
  } catch (err) {
    return false
  }
}

test('basic', (t) => {
  t.deepEqual(btc(success)(val), [null, val])
  t.deepEqual(btc(failure)(val), [err])

  t.end()
})

test('with context', (t) => {
  t.deepEqual(btc(assertContext(t, success)).call(ctx, val), [null, val])
  t.deepEqual(btc(assertContext(t, failure)).call(ctx, val), [err])

  t.end()
})

if (isAsyncAwaitSupported()) {
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
}
