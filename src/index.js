import {
  applyToArgs,
  applyToOtherArg,
  both,
  conditionallyCall,
  either,
  equal,
  first,
  get,
  has,
  ifThen,
  is,
  prefix,
  ternaryDo,
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
const mixBlue = ifThen(isYellow, get('green'))

const duplicate = fn => ([fn, fn])

const getParityAddition = conditionallyCall([
  duplicate(parityAdditionBothOdd),
  duplicate(parityAdditionEitherOdd),
], even)

const mixRed = conditionallyCall([
  [ applyToArgs(isYellow, [0]),
    get('orange'),
  ],
  [ applyToArgs(is('blue'), [0]),
    get('purple'),
  ],
], undef)

export const mixDirections = prefix

export const mixColors = conditionallyCall([
  [hasRed, applyToOtherArg(mixRed, 'red')],
  [hasBlue, applyToOtherArg(mixBlue, 'blue')],
], undef)

export const getParity = ternaryDo(
  applyToArgs(is('multiplication'), [0]),
  applyToArgs(ternaryDo(equal, first, even), [1, 2]),
  applyToArgs(getParityAddition, [1, 2]),
)

export const getProductSign = conditionallyCall([
  [both('negative'), positive],
  [either('negative'), negative],
], positive)
