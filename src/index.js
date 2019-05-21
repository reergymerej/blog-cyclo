export const mixColors = (a, b) => {
  if (a === 'red') {
    if (b === 'yellow') {
      return 'orange'
    } else if (b === 'blue') {
      return 'purple'
    }
  } else if (b === 'red') {
    if (a === 'yellow') {
      return 'orange'
    } else if (a === 'blue') {
      return 'purple'
    }
  } else if (a === 'blue') {
    if (b === 'yellow') {
      return 'green'
    }
  } else if (b === 'blue') {
    if (a === 'yellow') {
      return 'green'
    }
  }
}
