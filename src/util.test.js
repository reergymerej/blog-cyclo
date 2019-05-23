import * as mod from './util'

const describe = () => {}
const fdescribe = () => {}
const xdescribe = () => {}
const it = () => {}
const xit = () => {}
const fit = () => {}
const test = () => {}
const each = () => () => {}
test.each = each
it.each = each
describe.each = each

const no = () => 0
const yes = () => 1
const plus = (a, b) => a + b
const minus = (a, b) => a - b
const multiply = (a, b) => a * b
const throws = () => {
  throw new Error('yoink')
}

describe('conditionallyCall', () => {
  it('should call the default function', () => {
    const result = mod.conditionallyCall([], plus)(1, 2)
    expect(result).toBe(3)
  })

  it('should call the first function', () => {
    const result = mod.conditionallyCall([
      [yes, minus]
    ], plus)(1, 2)
    expect(result).toBe(-1)
  })

  it('should call the second function', () => {
    const result = mod.conditionallyCall([
      [no, plus],
      [yes, multiply],
    ], minus)(7, 11)
    expect(result).toBe(77)
  })

  it('should throw', () => {
    expect(() => {
      mod.conditionallyCall([
        [throws, yes]
      ], yes)(1, 2)
    }).toThrow('yoink')
  })
})

describe('doTernary', () => {
  it('should call the first function', () => {
    const result = mod.doTernary(
      yes, minus, plus
    )(1, 2)
    expect(result).toBe(-1)
  })

  it('should call the second function', () => {
    const result = mod.doTernary(
      no, minus, plus
    )(1, 2)
    expect(result).toBe(3)
  })
})

describe('ifThen', () => {
  it('should call the first function', () => {
    const result = mod.ifThen(
      yes, minus
    )(1, 2)
    expect(result).toBe(-1)
  })

  it('should return undefined', () => {
    const result = mod.ifThen(
      no, minus
    )(1, 2)
    expect(result).toBe()
  })
})

test.each([
  [1, 1, 1, true],
  [1, 0, 1, false],
  [1, 1, 0, false],
  [1, 0, 0, false],
])('both(%d)(%d, %d) === %s', (a, b, c, expected) => {
  expect(mod.both(a)(b, c)).toBe(expected)
})

describe('whitelist', () => {
  describe('when all values are OK', () => {
    it('should not throw', () => {
      const whitelist = mod.createWhitelistChecker(
        ['a', 'b', 'c'],
        throws,
        yes
      )
      whitelist('a', 'a', 'c', 'b')
    })

    it('should return value of "good" function', () => {
      const whitelist = mod.createWhitelistChecker(
        ['a', 'b', 'c'],
        throws,
        (...args) => args
      )
      expect(whitelist('a', 'a', 'c', 'b')).toEqual(['a', 'a', 'c', 'b'])
    })
  })

  it('should throw', () => {
    const whitelist = mod.createWhitelistChecker(['a', 'b'], throws)
    expect(() => {
      whitelist('a', 'a', 'horse', 'b')
    }).toThrow('yoink')
  })
})
