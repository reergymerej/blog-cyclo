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

const nth = (n) => (...args) => args[n]
const first = nth(0)

const applyNthArgTo = (n, fn) => (...args) => fn(nth(n)(...args))

const is = (something) => (a) => a === something

const sendArg = (fn, value) => conditionallyExecuteFromList([
  [ applyNthArgTo(0, is(value)),
    applyNthArgTo(1, fn),
  ],
  [ applyNthArgTo(1, is(value)),
    applyNthArgTo(0, fn),
  ],
], undef)

const prefix = (a, b) => `${a}${b}`

export const mixDirections = prefix

const mixBlue = ternary(
  is('yellow'),
  get('green'),
  undef
)

const has = (value) => (a, b) => a === value || b === value
const hasRed = has('red')
const hasBlue = has('blue')

const mixRed = conditionallyExecuteFromList([
  [ applyNthArgTo(0, is('yellow')),
    get('orange'),
  ],
  [ applyNthArgTo(0, is('blue')),
    get('purple'),
  ],
], undef)

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
