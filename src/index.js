const fromHash = (hash) => (key) => hash[key]

const ifThen = (fn, result) => (a, b) => {
  if (fn(a, b)) {
    return result
  }
}

const bothX = (x) => (a, b) => (a === x && b === x)
const eitherX = (x) => (a, b) => (a === x || b === x)

const bothOdd = bothX('odd')
const eitherOdd = eitherX('odd')

const parityAdditionBothOdd = ifThen(bothOdd, 'even')
const parityAdditionEitherOdd = ifThen(eitherOdd, 'odd')

// 3
const doubleCheck = (cond1, fn1, cond2, fn2, result) => (a, b) => {
  if (cond1(a, b)) {
    return fn1(a, b)
  } else if (cond2(a, b)) {
    return fn2(a, b)
  }
  return result
}

const getParityAddition = doubleCheck(
  parityAdditionBothOdd, parityAdditionBothOdd,
  parityAdditionEitherOdd, parityAdditionEitherOdd,
  'even'
)

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

// 3
export const mixDirections = (a, b) => {
  if (a === 'N') {
    return `N${b}`
  } else if (a === 'S') {
    return `S${b}`
  }
}

const mixBlue = (a) => {
  if (a === 'yellow') {
    return 'green'
  }
}

const has = (value) => (a, b) => a === value || b === value
const hasRed = has('red')
const hasBlue = has('blue')

const mixRed = twoWay('yellow', 'orange', 'blue', 'purple')
const mixRedOnSomeSide = sendArg(mixRed, 'red')
const mixBlueOnSomeSide = sendArg(mixBlue, 'blue')

export const mixColors = doubleCheck(hasRed, mixRedOnSomeSide, hasBlue, mixBlueOnSomeSide)


const bothNegative = bothX('negative')
const eitherNegative = eitherX('negative')

// 3
export const getProductSign = (a, b) => {
  if (bothNegative(a, b)) {
    return 'positive'
  } else if (eitherNegative(a, b)) {
    return 'negative'
  }
  return 'positive'
}


const getParityMultiplication = (a, b) => (a === b)
  ? a
  : 'even'


export const getParity = (operation, a, b) => (operation === 'multiplication')
  ? getParityMultiplication(a, b)
  : getParityAddition(a, b)
