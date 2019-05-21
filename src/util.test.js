import * as mod from './util'

describe('util', () => {
  it('should have a bunch of functions!', () => {
    expect(Object.keys(mod).length > 1).toBe(true)
  })
})

describe('conditionallyCall', () => {
  const no = () => 0
  const yes = () => 1
  const plus = (a, b) => a + b
  const minus = (a, b) => a - b
  const multiply = (a, b) => a * b

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
})
