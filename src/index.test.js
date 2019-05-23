import tape from 'tape'
import * as mod from '.'

;[
  ['blue', 'red', 'purple'],
  ['blue', 'yellow', 'green'],
  ['red', 'blue', 'purple'],
  ['red', 'yellow', 'orange'],
  ['yellow', 'blue', 'green'],
  ['yellow', 'red', 'orange'],
].forEach(([a, b, expected]) => {
  tape('mixColors(%s, %s)', (t) => {
    t.equal(expected, mod.mixColors(a, b))
    t.end()
  })
})

;[
  ['brown', 'red', 'brown'],
  ['red', 'taupe', 'taupe'],
  ['blue', 'taupe', 'taupe'],
  ['chartreuse', 'blue', 'chartreuse'],
  ['yellow', 'mauve', 'mauve'],
  ['grey', 'yellow', 'grey'],
].forEach(([a, b, c]) => {
  tape('(%s, %s) throws %s', (t) => {
    try {
      mod.mixColors(a, b)
    } catch (error) {
      t.equal(c, error.message)
    }
    t.end()
  })
})

;[
  ['N', 'w', 'NW'],
  ['N', 'E', 'NE'],
  ['s', 'W', 'SW'],
  ['S', 'E', 'SE'],
].forEach(([a, b, expected]) => {
  tape('mixDirections(%s, %s)', (t) => {
    t.equal(expected, mod.mixDirections(a, b))
    t.end()
  })
})

;[
  ['N', 'X', 'X'],
  ['X', 'E', 'X'],
].forEach(([a, b, c]) => {
  tape('mixDirections', (t) => {
    try {
      mod.mixDirections(a, b)
    } catch (error) {
      t.equal(c, error.message)
    }
    t.end()
  })
})

;[
  ['positIve', 'posITIve', 'positive'],
  ['positiVe', 'neGATive', 'negative'],
  ['negative', 'poSITive', 'negative'],
  ['negatIVe', 'negative', 'positive'],
].forEach(([a, b, expected]) => {
  tape('getProductSign(%s, %s)', (t) => {
    t.equal(expected, mod.getProductSign(a, b))
    t.end()
  })
})

;[
  ['positiVe', 'banana', 'banana'],
  ['negative', 'bonanza', 'bonanza'],
  ['spoon', 'negaTIve', 'spoon'],
  ['fork', 'positive', 'fork'],
].forEach(([a, b, c]) => {
  tape('(%s, %s) throws %s', (t) => {
    try {
      mod.getProductSign(a, b)
    } catch (error) {
      t.equal(c, error.message)
    }
    t.end()
  })
})

;[
  ['addition', 'even', 'even', 'even'],
  ['addition', 'evEn', 'odd', 'odd'],
  ['addition', 'odd', 'even', 'odd'],
  ['addition', 'odd', 'odd', 'even'],

  ['subtraction', 'even', 'even', 'even'],
  ['subtraction', 'even', 'oDd', 'odd'],
  ['subtraction', 'odd', 'even', 'odd'],
  ['subtraction', 'odd', 'odd', 'even'],

  ['multiplication', 'even', 'even', 'even'],
  ['multiplication', 'even', 'odd', 'even'],
  ['multiplication', 'odd', 'even', 'even'],
  ['multiplication', 'odd', 'odd', 'odd'],
].forEach(([operation, a, b, expected]) => {
  tape('getParity(%s, %s)', (t) => {
    t.equal(expected, mod.getParity(operation, a, b))
    t.end()
  })
})

;[
  ['multiplication', 'odd', 'cheese', 'cheese'],
  ['multiplicaTIOn', 'eVen', 'cheese', 'cheese'],
  ['multiplication', 'cheese', 'odD', 'cheese'],
  ['multiplication', 'cheese', 'even', 'cheese'],

  ['addition', 'odd', 'cheese', 'cheese'],
  ['addition', 'even', 'cheese', 'cheese'],
  ['addition', 'cheese', 'odd', 'cheese'],
  ['addition', 'cheese', 'even', 'cheese'],

  ['hot fire', 'even', 'even', 'hot fire'],
  ['hot fire', 'even', 'odd', 'hot fire'],
  ['hot fire', 'odd', 'even', 'hot fire'],
  ['hot fire', 'odd', 'odd', 'hot fire'],
].forEach(([operation, a, b, c]) => {
  tape('(%s, %s, %s) throws %s', (t) => {
    try {
      mod.getParity(operation, a, b)
    } catch (error) {
      t.equal(c, error.message)
    }
    t.end()
  })
})
