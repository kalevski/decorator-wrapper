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