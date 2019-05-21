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

// 5
export const mixColors = (a, b) => {
  if (a === 'red') {
    return mixRed(b)
  } else if (b === 'red') {
    return mixRed(a)
  } else if (a === 'blue') {
    return mixBlue(b)
  } else if (b === 'blue') {
    return mixBlue(a)
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

const getParityMultiplication = (a, b) => {
  if (a === b) {
    return a
  }
  return 'even'
}

// 4
const getParityAddition = (a, b) => {
  if (a === 'odd' && b === 'odd') {
    return 'even'
  } else if (a === 'odd' || b === 'odd') {
    return 'odd'
  }
  return 'even'
}

export const getParity = (operation, a, b) => {
  return (operation === 'multiplication')
    ? getParityMultiplication(a, b)
    : getParityAddition(a, b)
}
