import tape from 'tape'
import * as mod from './util'

const no = () => 0
const yes = () => 1
const plus = (a, b) => a + b
const minus = (a, b) => a - b
const multiply = (a, b) => a * b
const throws = () => {
  throw new Error('yoink')
}

// conditionallyCall
tape('should call the default function', (t) => {
  const result = mod.conditionallyCall([], plus)(1, 2)
  t.equal(3, result)
  t.end()
})

tape('should call the first function', (t) => {
  const result = mod.conditionallyCall([
    [yes, minus]
  ], plus)(1, 2)
  t.equal(-1, result)
  t.end()
})

tape('should call the second function', (t) => {
  const result = mod.conditionallyCall([
    [no, plus],
    [yes, multiply],
  ], minus)(7, 11)
  t.equal(77, result)
  t.end()
})

tape('should throw', (t) => {
  try {
    mod.conditionallyCall([
        [throws, yes]
    ], yes)(1, 2)
  } catch (error) {
    t.equal('yoink', error.message)
  }
  t.end()
})

// doTernary
tape('should call the first function', (t) => {
  const result = mod.doTernary(
    yes, minus, plus
  )(1, 2)
  t.equal(-1, result)
  t.end()
})

tape('should call the second function', (t) => {
  const result = mod.doTernary(
    no, minus, plus
  )(1, 2)
  t.equal(3, result)
  t.end()
})

tape('should call the first function', (t) => {
  const result = mod.ifThen(
    yes, minus
  )(1, 2)
  t.equal(-1, result)
  t.end()
})

// ifThen
tape('should return undefined', (t) => {
  const result = mod.ifThen(
    no, minus
  )(1, 2)
  t.equal(undefined, result)
  t.end()
})

;[
  [1, 1, 1, true],
  [1, 0, 1, false],
  [1, 1, 0, false],
  [1, 0, 0, false],
].forEach(([a, b, c, expected]) => {
  tape('both(%d)(%d, %d) === %s', (t) => {
    t.equal(expected, mod.both(a)(b, c))
    t.end()
  })
})

// whitelist
tape('should not throw', (t) => {
  const whitelist = mod.createWhitelistChecker(
    ['a', 'b', 'c'],
    throws,
    yes
  )
  whitelist('a', 'a', 'c', 'b')
  t.end()
})

tape('should return value of "good" function', (t) => {
  const whitelist = mod.createWhitelistChecker(
    ['a', 'b', 'c'],
    throws,
    (...args) => args
  )
  t.deepEqual(['a', 'a', 'c', 'b'], whitelist('a', 'a', 'c', 'b'))
  t.end()
})

tape('should throw', (t) => {
  const whitelist = mod.createWhitelistChecker(['a', 'b'], throws)
  try {
    whitelist('a', 'a', 'horse', 'b')
  } catch (error) {
    t.equal('yoink', error.message)
  }
  t.end()
})
