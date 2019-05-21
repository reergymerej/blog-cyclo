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
