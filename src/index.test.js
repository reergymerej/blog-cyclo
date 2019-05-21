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
})
