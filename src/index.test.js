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
