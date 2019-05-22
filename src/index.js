import {
  applyToArgs,
  applyToOtherArg,
  both,
  conditionallyCall,
  createWhitelistChecker,
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
  duplicate(parityAdditionBothOdd), // TODO: find a better way to share the result
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

const createListGate = (list) => createWhitelistChecker(list, handleUnknownOption, undef)
const directionWhitelist = createListGate(['N', 'E', 'W', 'S'])
const colorWhitelist = createListGate(['red', 'yellow', 'blue'])

export const mixDirections = (a, b) => {
  directionWhitelist(a, b)
  return prefix(a, b)
}

export const mixColors = conditionallyCall([
  [colorWhitelist],
  [hasRed, applyToOtherArg(mixRed, 'red')],
  [hasBlue, applyToOtherArg(mixBlue, 'blue')],
], undef)

const parityMultiplicationWhiteList = createListGate(['odd', 'even'])
const getParityMultiplication = conditionallyCall([
    [parityMultiplicationWhiteList],
],
  doTernary(equal, first, even)
  )

export const getParity = doTernary(
  testArg(0, is('multiplication')),
    applyToArgs(getParityMultiplication, [1, 2]),
    applyToArgs(getParityAddition, [1, 2])
)

const productSignWhiteList = createListGate(['positive', 'negative'])
export const getProductSign = conditionallyCall([
  [productSignWhiteList],
  [both('negative'), positive],
  [either('negative'), negative],
], positive)
