const fromHash = (hash) => (key) => hash[key]

const conditionallyExecuteFromList = (list, defaultFn) => (...args) => {
  const matched = list.find(([test]) => test(...args))
  return (matched)
    ? matched[1](...args)
    : defaultFn(...args)
}

const ternary = (testFn, truthyFn, falsyFn) => (...args) =>
  conditionallyExecuteFromList([[ testFn, truthyFn ]], falsyFn)(...args)

const both = (x) => (a, b) => (a === x && b === x)
const either = (x) => (a, b) => (a === x || b === x)

const bothOdd = both('odd')
const eitherOdd = either('odd')

const bothNegative = both('negative')
const eitherNegative = either('negative')

const get = (x) => () => x
const even = get('even')
const odd = get('odd')
const positive = get('positive')
const negative = get('negative')
const undef = get()

const parityAdditionBothOdd = ternary(bothOdd, even, undef)
const parityAdditionEitherOdd = ternary(eitherOdd, odd, undef)

export const getProductSign = conditionallyExecuteFromList([
    [bothNegative, positive],
    [eitherNegative, negative],
], positive)

const getParityAddition = conditionallyExecuteFromList([
    [parityAdditionBothOdd, parityAdditionBothOdd],
    [parityAdditionEitherOdd, parityAdditionEitherOdd],
], even)

// 3
const sendArg = (fn, value) => (a, b) => {
  if (a === value) {
    return fn(b)
  } else if (b === value) {
    return fn(a)
  }
}

const twoWay = (cond1, result1, cond2, result2) => fromHash({
  [cond1]: result1,
  [cond2]: result2,
})

const prefix = (a, b) => `${a}${b}`

export const mixDirections = prefix

const first = (a) => a
const is = (something) => (a) => a === something

const mixBlue = ternary(
  is('yellow'),
  get('green'),
  undef
)

const has = (value) => (a, b) => a === value || b === value
const hasRed = has('red')
const hasBlue = has('blue')

const mixRed = twoWay('yellow', 'orange', 'blue', 'purple')
const mixRedOnSomeSide = sendArg(mixRed, 'red')
const mixBlueOnSomeSide = sendArg(mixBlue, 'blue')

export const mixColors = conditionallyExecuteFromList([
  [hasRed, mixRedOnSomeSide],
  [hasBlue, mixBlueOnSomeSide],
], undef)

const equal = (a, b) => a === b

const getParityMultiplication = ternary(equal, first, even)

export const getParity = (operation, a, b) =>
  (operation === 'multiplication')
    ? getParityMultiplication(a, b)
    : getParityAddition(a, b)
