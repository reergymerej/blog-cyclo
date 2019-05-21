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

// 4
export const getProductSign = (a, b) => {
  if (a === 'negative' && b === 'negative') {
    return 'positive'
  } else if (a === 'negative' || b === 'negative') {
    return 'negative'
  }
  return 'positive'
}

const getParityMultiplication = (a, b) => (a === b)
  ? a
  : 'even'

// 4
const getParityAddition = (a, b) => {
  if (a === 'odd' && b === 'odd') {
    return 'even'
  } else if (a === 'odd' || b === 'odd') {
    return 'odd'
  }
  return 'even'
}

export const getParity = (operation, a, b) => (operation === 'multiplication')
  ? getParityMultiplication(a, b)
  : getParityAddition(a, b)
