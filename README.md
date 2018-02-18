### DECORATOR-WRAPPER

This is all you need to write your own decorators in JavaScript

## Installation
Important: Your project must be ES6+
```js
    npm install --save decorator-wrapper
    npm install --save-dev babel-plugin-transform-decorators-legacy
```
add .babelrc
```
{
    "presets": ["es2015", "stage-0"],
    "plugins": ["transform-decorators-legacy"]
}
```