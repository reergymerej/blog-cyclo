// 3
const mixRed = (a) => {
  if (a === 'yellow') {
    return 'orange'
  } else if (a === 'blue') {
    return 'purple'
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

const sendArg = (fn, value) => (a, b) => {
  if (a === value) {
    return fn(b)
  } else if (b === value) {
    return fn(a)
  }
}

const mixRedOnSomeSide = sendArg(mixRed, 'red')
const mixBlueOnSomeSide = sendArg(mixBlue, 'blue')

// 3
export const mixColors = (a, b) => {
  if (hasRed(a, b)) {
    return mixRedOnSomeSide(a, b)
  } else if (hasBlue(a, b)) {
    return mixBlueOnSomeSide(a, b)
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

const getParityMultiplication = (a, b) => (a === b)
  ? a
  : 'even'



const bothOdd = bothX('odd')
const eitherOdd = eitherX('odd')


// 3
const getParityAddition = (a, b) => {
  if (bothOdd(a, b)) {
    return 'even'
  } else if (eitherOdd(a, b)) {
    return 'odd'
  }
  return 'even'
}

export const getParity = (operation, a, b) => (operation === 'multiplication')
  ? getParityMultiplication(a, b)
  : getParityAddition(a, b)
