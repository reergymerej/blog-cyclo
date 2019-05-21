const conditionallyExecuteFromList = (list, defaultFn) => (...args) => {
  const matched = list.find(([test]) => test(...args))
  return (matched)
    ? matched[1](...args)
    : defaultFn(...args)
}

const ternaryDo = (testFn, truthyFn, falsyFn) => (...args) =>
  conditionallyExecuteFromList([[ testFn, truthyFn ]], falsyFn)(...args)

const ifThen = (testFn, truthyFn) => ternaryDo(testFn, truthyFn, undef)

const both = (x) => (a, b) => (a === x && b === x)
const either = (x) => (a, b) => (a === x || b === x)

const get = (x) => () => x
const undef = get()

const nth = (n) => (...args) => args[n]
const first = nth(0)
const is = (something) => (a) => a === something

const applyToArgs = (fn, argIndices) => (...args) => {
  const argsToForward = argIndices.map(i => args[i])
  return fn(...argsToForward)
}

const applyToOtherArg = (fn, value) => conditionallyExecuteFromList([
  [ applyToArgs(is(value), [0]),
    applyToArgs(fn, [1]),
  ],
  [ applyToArgs(is(value), [1]),
    applyToArgs(fn, [0]),
  ],
], undef)

const prefix = (a, b) => `${a}${b}`
const has = (value) => (a, b) => a === value || b === value
const equal = (a, b) => a === b

// -----------------------------------------------------------------------------

const even = get('even')
const odd = get('odd')
const positive = get('positive')
const negative = get('negative')

const parityAdditionBothOdd = ifThen(both('odd'), even)
const parityAdditionEitherOdd = ifThen(either('odd'), odd)

const getParityAddition = conditionallyExecuteFromList([
    [parityAdditionBothOdd, parityAdditionBothOdd],
    [parityAdditionEitherOdd, parityAdditionEitherOdd],
], even)

const isYellow = is('yellow')
const mixBlue = ifThen(isYellow, get('green'))

const hasRed = has('red')
const hasBlue = has('blue')

const mixRed = conditionallyExecuteFromList([
  [ applyToArgs(isYellow, [0]),
    get('orange'),
  ],
  [ applyToArgs(is('blue'), [0]),
    get('purple'),
  ],
], undef)

export const mixDirections = prefix

export const mixColors = conditionallyExecuteFromList([
  [hasRed, applyToOtherArg(mixRed, 'red')],
  [hasBlue, applyToOtherArg(mixBlue, 'blue')],
], undef)

export const getParity = ternaryDo(
  applyToArgs(is('multiplication'), [0]),
  applyToArgs(ternaryDo(equal, first, even), [1, 2]),
  applyToArgs(getParityAddition, [1, 2]),
)

export const getProductSign = conditionallyExecuteFromList([
  [both('negative'), positive],
  [either('negative'), negative],
], positive)
