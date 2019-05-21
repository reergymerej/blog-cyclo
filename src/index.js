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

const hasRed = (a, b) => a === 'red' || b === 'red'

const hasBlue = (a, b) => a === 'blue' || b === 'blue'

// 3
const mixRedOnSomeSide = (a, b) => {
  if (a === 'red') {
    return mixRed(b)
  } else if (b === 'red') {
    return mixRed(a)
  }
}

// 3
const mixBlueOnSomeSide = (a, b) => {
  if (a === 'blue') {
    return mixBlue(b)
  } else if (b === 'blue') {
    return mixBlue(a)
  }
}

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
