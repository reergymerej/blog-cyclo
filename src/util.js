export const conditionallyCall = (list, defaultFn) => (...args) => {
  const matched = list.find(([test]) => test(...args))
  return (matched)
    ? matched[1](...args)
    : defaultFn(...args)
}

export const doTernary = (testFn, truthyFn, falsyFn) => (...args) =>
  conditionallyCall([[ testFn, truthyFn ]], falsyFn)(...args)

export const ifThen = (testFn, truthyFn) => doTernary(testFn, truthyFn, undef)

const getLowerCaseComparator = (a) => a.toLowerCase ? a.toLowerCase() : a
const lowerCompare = (a, b) => getLowerCaseComparator(a) === getLowerCaseComparator(b)

export const both = (x) => (a, b) => (lowerCompare(a, x) && lowerCompare(b, x))
export const either = (x) => (a, b) => (lowerCompare(a, x) || lowerCompare(b, x))

export const get = (x) => () => x
export const undef = get()

const nth = (n) => (...args) => args[n]
export const first = nth(0)
export const is = (something) => (a) => a === something

export const applyToArgs = (fn, argIndices) => (...args) => {
  const argsToForward = argIndices.map(i => args[i])
  return fn(...argsToForward)
}

export const applyToOtherArg = (fn, value) => conditionallyCall([
  [ applyToArgs(is(value), [0]),
    applyToArgs(fn, [1]),
  ],
  [ applyToArgs(is(value), [1]),
    applyToArgs(fn, [0]),
  ],
], undef)

const lower = (x) => x.toLowerCase()

const notIn = (list) => {
  const loweredList = list.map(lower)
  return (value) => {
    if (!loweredList.includes(value.toLowerCase())) {
      return value
    }
  }
}

const findNotIn = (list) => {
  const notInList = notIn(list)
  return (...args) => args.find(notInList)
}

export const prefix = (a, b) => `${a}${b}`
export const has = (value) => (a, b) => a === value || b === value
export const equal = (a, b) => a === b

export const testArg = (n, isFn) => applyToArgs(isFn, [n])

export const createWhitelistChecker = (list, onInvalidOption, onAllValid) => (...args) => {
  const badValue = findNotIn(list)(...args)
  return badValue
    ? onInvalidOption(badValue)
    : onAllValid(...args)
}
