import * as util from './util'

const even = util.get('even')
const odd = util.get('odd')
const positive = util.get('positive')
const negative = util.get('negative')

const parityAdditionBothOdd = util.ifThen(util.both('odd'), even)
const parityAdditionEitherOdd = util.ifThen(util.either('odd'), odd)

const getParityAddition = util.conditionallyExecuteFromList([
  [parityAdditionBothOdd, parityAdditionBothOdd],
  [parityAdditionEitherOdd, parityAdditionEitherOdd],
], even)

const isYellow = util.is('yellow')
const mixBlue = util.ifThen(isYellow, util.get('green'))

const hasRed = util.has('red')
const hasBlue = util.has('blue')

const mixRed = util.conditionallyExecuteFromList([
  [ util.applyToArgs(isYellow, [0]),
    util.get('orange'),
  ],
  [ util.applyToArgs(util.is('blue'), [0]),
    util.get('purple'),
  ],
], util.undef)

export const mixDirections = util.prefix

export const mixColors = util.conditionallyExecuteFromList([
  [hasRed, util.applyToOtherArg(mixRed, 'red')],
  [hasBlue, util.applyToOtherArg(mixBlue, 'blue')],
], util.undef)

export const getParity = util.ternaryDo(
  util.applyToArgs(util.is('multiplication'), [0]),
  util.applyToArgs(util.ternaryDo(util.equal, util.first, even), [1, 2]),
  util.applyToArgs(getParityAddition, [1, 2]),
)

export const getProductSign = util.conditionallyExecuteFromList([
  [util.both('negative'), positive],
  [util.either('negative'), negative],
], positive)
