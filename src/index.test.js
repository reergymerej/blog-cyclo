import * as mod from '.'

describe('mixColors', () => {
  const input = [
    ['blue', 'red', 'purple'],
    ['blue', 'yellow', 'green'],
    ['red', 'blue', 'purple'],
    ['red', 'yellow', 'orange'],
    ['yellow', 'blue', 'green'],
    ['yellow', 'red', 'orange'],
  ]

  test.each(input)('mixColors(%s, %s)', (a, b, expected) => {
    expect(mod.mixColors(a, b)).toBe(expected)
  })

  it.each([
    ['brown', 'red', 'brown'],
    ['red', 'taupe', 'taupe'],
    ['blue', 'taupe', 'taupe'],
    ['chartreuse', 'blue', 'chartreuse'],
    ['yellow', 'mauve', 'mauve'],
    ['grey', 'yellow', 'grey'],
  ])('(%s, %s) throws %s', (a, b, c) => {
    expect(() => { expect(mod.mixColors(a, b)) }).toThrow(c)
  })
})

describe('mixDirections', () => {
  const input = [
    ['N', 'W', 'NW'],
    ['N', 'E', 'NE'],
    ['S', 'W', 'SW'],
    ['S', 'E', 'SE'],
  ]

  test.each(input)('mixDirections(%s, %s)', (a, b, expected) => {
    expect(mod.mixDirections(a, b)).toBe(expected)
  })

  it.each([
    ['N', 'X', 'X'],
    ['X', 'E', 'X'],
  ])('(%s, %s) throws %s', (a, b, c) => {
    expect(() => { expect(mod.mixDirections(a, b)) }).toThrow(c)
  })
})

describe('getProductSign', () => {
  const input = [
    ['positive', 'positive', 'positive'],
    ['positive', 'negative', 'negative'],
    ['negative', 'positive', 'negative'],
    ['negative', 'negative', 'positive'],
  ]

  test.each(input)('getProductSign(%s, %s)', (a, b, expected) => {
    expect(mod.getProductSign(a, b)).toBe(expected)
  })

  it.each([
    ['positive', 'banana', 'banana'],
    ['negative', 'bonanza', 'bonanza'],
    ['spoon', 'negative', 'spoon'],
    ['fork', 'positive', 'fork'],
  ])('(%s, %s) throws %s', (a, b, c) => {
    expect(() => { expect(mod.getProductSign(a, b)) }).toThrow(c)
  })
})

describe('getParity', () => {
  const input = [
    ['addition', 'even', 'even', 'even'],
    ['addition', 'even', 'odd', 'odd'],
    ['addition', 'odd', 'even', 'odd'],
    ['addition', 'odd', 'odd', 'even'],

    ['subtraction', 'even', 'even', 'even'],
    ['subtraction', 'even', 'odd', 'odd'],
    ['subtraction', 'odd', 'even', 'odd'],
    ['subtraction', 'odd', 'odd', 'even'],

    ['multiplication', 'even', 'even', 'even'],
    ['multiplication', 'even', 'odd', 'even'],
    ['multiplication', 'odd', 'even', 'even'],
    ['multiplication', 'odd', 'odd', 'odd'],
  ]

  test.each(input)('getParity(%s, %s)', (operation, a, b, expected) => {
    expect(mod.getParity(operation, a, b)).toBe(expected)
  })

  it.each([
    ['multiplication', 'odd', 'cheese', 'cheese'],
    ['multiplication', 'even', 'cheese', 'cheese'],
    ['multiplication', 'cheese', 'odd', 'cheese'],
    ['multiplication', 'cheese', 'even', 'cheese'],

    ['addition', 'odd', 'cheese', 'cheese'],
    ['addition', 'even', 'cheese', 'cheese'],
    ['addition', 'cheese', 'odd', 'cheese'],
    ['addition', 'cheese', 'even', 'cheese'],

    ['hot fire', 'even', 'even', 'hot fire'],
    ['hot fire', 'even', 'odd', 'hot fire'],
    ['hot fire', 'odd', 'even', 'hot fire'],
    ['hot fire', 'odd', 'odd', 'hot fire'],
  ])('(%s, %s) throws %s', (operation, a, b, c) => {
    expect(() => { expect(mod.getParity(operation, a, b)) }).toThrow(c)
  })
})
