// 3
const threeWay = (cond1, result1, cond2, result2) => (a) => {
  if (a === cond1) {
    return result1
  } else if (a === cond2) {
    return result2
  }
}

const mixRed = threeWay('yellow', 'orange', 'blue', 'purple')

// 3
const sendArg = (fn, value) => (a, b) => {
  if (a === value) {
    return fn(b)
  } else if (b === value) {
    return fn(a)
  }
}

// 3
const threeWayCheck = (check1, cb1, check2, cb2) => (a, b) => {
  if (check1(a, b)) {
    return cb1(a, b)
  } else if (check2(a, b)) {
    return cb2(a, b)
  }
}

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

const mixRedOnSomeSide = sendArg(mixRed, 'red')
const mixBlueOnSomeSide = sendArg(mixBlue, 'blue')

export const mixColors = threeWayCheck(hasRed, mixRedOnSomeSide, hasBlue, mixBlueOnSomeSide)

const bothX = (x) => (a, b) => (a === x && b === x)
const eitherX = (x) => (a, b) => (a === x || b === x)

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

// 3
const getParityAddition = (a, b) => {
  if (bothOdd(a, b)) {
    return 'even'
  } else if (eitherOdd(a, b)) {
    return 'odd'
  }
  return 'even'
}

const getParityMultiplication = (a, b) => (a === b)
  ? a
  : 'even'

const bothOdd = bothX('odd')
const eitherOdd = eitherX('odd')

export const getParity = (operation, a, b) => (operation === 'multiplication')
  ? getParityMultiplication(a, b)
  : getParityAddition(a, b)
