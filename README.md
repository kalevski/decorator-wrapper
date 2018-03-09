### DECORATOR-WRAPPER

[![Build Status](https://travis-ci.org/kalevski/decorator-wrapper.svg?branch=master)](https://travis-ci.org/kalevski/decorator-wrapper)

This is all you need to write your own decorators in JavaScript

## Installation
Important: Your project must be ES6
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

## Example

decorator class:
```js
import { DECORATOR } from '../src';

class ExampleDecorator {
    
    instance = {};
    
    classDefined(className, createInstance, [ testString ]) {
        console.log('class is defined', className, testString);
        this.instance[className] = createInstance(); // you can create instance here
    }

    classInstanced(className, args, createInstance, [ testString ]) {
        console.log('class is instanced', className, testString);
        return createInstance(...args);
    }
    
    methodCalled(method, methodName, args, argNames, scope, [ exampleText ]) {
        console.log('before');
        args.push(exampleText);
        scope.example = 'example'; // or edit scope of instance here
        let value = method.apply(scope, args);
        console.log('after');
        return value;
    }

    propertyInit(propertyName, descriptor, [ value ]) {
        return value;
    }
}

export default DECORATOR(ExampleDecorator);
```

decorator usage:
```js
import ExampleDecorator from './exampleDecorator';

@ExampleDecorator('test')
class Example {

    @ExampleDecorator(15)
    something = 1;

    @ExampleDecorator('example text 14')
    exampleMethod(exampleText) {
        console.log('value of property "something" is: ' + this.something);
        console.log('exampleText is: ' + exampleText);
    }

    test() {
        console.log('new property added by decorator: ' + this.example);
    }
}

let example = new Example();
example.exampleMethod();
example.test();
```