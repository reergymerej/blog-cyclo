# Notes

We move through code by functions.

What type of functions are there?


https://esprima.readthedocs.io/en/4.0/syntax-tree-format.html#function-declaration
FunctionDeclaration
`function foo() {}`

https://esprima.readthedocs.io/en/4.0/syntax-tree-format.html#arrow-function-expression
ArrowFunctionExpression
`const foo = () => {}`

https://esprima.readthedocs.io/en/4.0/syntax-tree-format.html#function-expression
```js
const x = {
  foo: function () {}
}
```



Every function has a body.  When we write tests, we will be thinking in terms of
what function body (scope) we're in.


Given an AST and any function body, we should be able to figure out how to
reference the function in the scope of its declaration.
