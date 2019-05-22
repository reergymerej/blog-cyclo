import {
  applyToArgs,
  applyToOtherArg,
  both,
  conditionallyCall,
  doTernary,
  either,
  equal,
  first,
  get,
  has,
  ifThen,
  is,
  prefix,
  testArg,
  undef,
} from './util'

const even = get('even')
const odd = get('odd')
const positive = get('positive')
const negative = get('negative')

const isYellow = is('yellow')
const hasRed = has('red')
const hasBlue = has('blue')
const hasYellow = has('yellow')

const parityAdditionBothOdd = ifThen(both('odd'), even)
const parityAdditionEitherOdd = ifThen(either('odd'), odd)
const handleUnknownOption = (unknown) => {
  throw new Error(unknown)
}

const mixBlue = doTernary(
  isYellow,
  get('green'),
  handleUnknownOption,
)

const duplicate = fn => ([fn, fn])

const getParityAddition = conditionallyCall([
  duplicate(parityAdditionBothOdd),
  duplicate(parityAdditionEitherOdd),
], even)

const mixRed = conditionallyCall([
  [ testArg(0, isYellow),
    get('orange'),
  ],
  [ applyToArgs(is('blue'), [0]),
    get('purple'),
  ],
], handleUnknownOption)

const notIn = (list, value) => {
  if (!list.includes(value)) {
    return value
  }
}

const findNotIn = (list) => (...args) => args.find(x => notIn(list, x))

const createWhitelistChecker = (list, onInvalidOption) => (a, b) => {
  const badValue = findNotIn(list)(a, b)
  return badValue
    ? onInvalidOption(badValue)
    : prefix(a, b)
}

const directionWhitelist = createWhitelistChecker(['N', 'E', 'W', 'S'], handleUnknownOption)

export const mixDirections = (a, b) => {
  directionWhitelist(a, b)
  return prefix(a, b)
}

export const mixColors = conditionallyCall([
  [hasRed, applyToOtherArg(mixRed, 'red')],
  [hasBlue, applyToOtherArg(mixBlue, 'blue')],
  [hasYellow, applyToOtherArg(handleUnknownOption, 'yellow')],
], undef)

export const getParity = doTernary(
  testArg(0, is('multiplication')),
  applyToArgs(doTernary(
      equal,
        first,
        even), [1, 2]),
    applyToArgs(getParityAddition, [1, 2]),
)

export const getProductSign = conditionallyCall([
  [both('negative'), positive],
  [either('negative'), negative],
], positive)
