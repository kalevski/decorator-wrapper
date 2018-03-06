import { DECORATOR } from '../src';
import assert from 'assert'

class DummyDecorator {
  classDefined(className, createInstance, [ testString ]) {
  }

  classInstanced(className, args, createInstance, [ testString ]) {

  }

  methodCalled(method, methodName, args, argNames, scope, [ exampleText ]) {

  }

  propertyInit(propertyName, descriptor, [ value ]) {
  }
}

describe('Test Class Decorators', function(){
  describe('Class Defined Decorator', function(){
    it('class defined decorator should be called', function(){
      let classDefinedCalled = false;
      class ClassDecorator extends DummyDecorator {
        classDefined(className, createInstance, [ testString ]) {
          classDefinedCalled = true;
        }
      };

      let decorator = DECORATOR(ClassDecorator);
      
      @decorator
      class AClass {

      }

      assert.ok(classDefinedCalled, 'The decorator should\'ve been called, but it wasn\'t.');
    });
    
    it('should be able to pass arg to the decorator', function(){
      class ClassDecorator extends DummyDecorator {
        classDefined(className, createInstance, [decoratorVal]){
          assert.equal(decoratorVal, 'some-value', 'Expected to get "some-value" as decorator argument, but instead got: ' + decoratorVal);
        }
      }
      
      let decorator = DECORATOR(ClassDecorator);
      
      @decorator("some-value")
      class AClass {

      }
      
    });
    
    it('should resolve class name properly', function(){
      class ClassDecorator extends DummyDecorator {
        classDefined(className, createInstance){
          assert.equal(className, 'AClass', 'Expected to get "AClass" as class name, but instead got: ' + className);
        }
      }
      
      let decorator = DECORATOR(ClassDecorator);
      
      @decorator()
      class AClass {}
    });
    
    it('should be able to create proper instance of the class', function(){
      let instance = undefined;
      
      class ClassDecorator extends DummyDecorator {
        classDefined(className, createInstance){
          instance = createInstance();
        }
      }
      
      let decorator = DECORATOR(ClassDecorator);
      
      @decorator()
      class AClass {}
      
      assert.ok(instance, 'Expected to create a new instance.')
      assert.ok(instance instanceof AClass, 'Expected the instance to be of class AClass, but instead is of type ' + (typeof instance));
      
    });
  });
  
  describe('Class Instanced Decorator', function(){
    it('class instanced decorator should be called', function(){
      let decoratorCalled = false;
      class ClassDecorator extends DummyDecorator {
        classInstanced(className, args, createInstance) {
          decoratorCalled = true;
        }
      }
      
      let decorator = DECORATOR(ClassDecorator);
      
      @decorator()
      class AClass {}
      
      new AClass()
      
      assert.ok(decoratorCalled, 'Expected the class instanced decorator to be called.')
      
    });
    
    it('should pass decorator arguments', function(){
      class ClassDecorator extends DummyDecorator {
        classInstanced(className, args, createInstance, [ value ]) {
          assert.ok(value, 'decorator-value', 'Expected to get "decorator-value" in the decorator arguments, but instead got ' + value);
        }
      }
      
      let decorator = DECORATOR(ClassDecorator);
      
      @decorator('decorator-value')
      class AClass {}
      
      new AClass()
      
    });
    
    it('should pass correct class name and constructor args', function(){
      let clsName = undefined;
      let constrArgs = undefined;
      
      class ClassDecorator extends DummyDecorator {
        classInstanced(className, args, createInstance) {
          clsName = className;
          constrArgs = args;
        }
      }
      
      let decorator = DECORATOR(ClassDecorator);
      
      @decorator
      class AClass {}
      
      new AClass('value0')
      
      assert.equal(clsName, 'AClass', 'Expected to get "AClass" as class name, but instad got ' + clsName);
      assert.ok(constrArgs, 'Expected the constructor arguments to be passed to the decorator');
      assert.ok(constrArgs.length, 'Expected to get at least one constructor argument');
      assert.equal(constrArgs[0], 'value0', 'Expected to get "value0" for the constructor argument, but instead got ' + constrArgs[0]);
    });
    
    
    it('should create correct instances of the class type', function(){
      let decoratorInstance = undefined;
      class ClassDecorator extends DummyDecorator {
        classInstanced(className, args, createInstance) {
          decoratorInstance = createInstance();
        }
      }
      
      let decorator = DECORATOR(ClassDecorator);
      
      @decorator
      class AClass {}
      
      let stdInstance = new AClass()
      
      assert.ok(decoratorInstance, 'An instance was not created with "createInstance".');
      assert.ok(decoratorInstance instanceof AClass, 'Expected the instance created with "createInstance" to be of type "AClass", but instead it is of type ' + (typeof decoratorInstance));
      
      assert.ok(stdInstance instanceof AClass, 'Expected the instance created with "new AClass()" to be of type "AClass", but instead is of type ' + (typeof stdInstance));
      
      
    });
    
  });
});


describe('Test Method Decorator', function(){
  it('method decorator should be called', function(){
    let called = false;
    
    class ClassDecorator extends DummyDecorator {
      methodCalled(method, methodName, args, argNames, scope) {
        called = true
      }
    }
    
    let decorator = DECORATOR(ClassDecorator);
    
    class AClass {
      @decorator
      foo(){}
    }
    
    new AClass().foo()
    
    assert.ok(called, 'The decorator was not called.');
  });
  
  it('method decorator and the method itself should be called with correct arguments', function(){
    let called = false;
    let dargs = undefined;
    
    class ClassDecorator extends DummyDecorator {
      methodCalled(method, methodName, args, argNames, scope) {
        called = true;
        dargs = args;
      }
    }
    
    let decorator = DECORATOR(ClassDecorator);
    
    let methodCalled = false;
    let arg1 = undefined;
    let arg2 = undefined;
    
    class AClass {
      @decorator
      foo(strVal, numVal){
        methodCalled = true;
        arg1 = strVal;
        arg2 = numVal;
      }
    }
    
    new AClass().foo('over', 9000)
    
    assert.ok(called, 'The decorator was not called.');
    assert.ok(dargs, 'Expected the method arguments to be passed to the decorator.')
    assert.equal(dargs.length, 2, 'Expected exactly 2 arguments to be passed, but istead were passed ' + dargs.length);
    assert.equal(dargs[0], 'over', 'Decorator got invalid value passed for the first argument of the method. Expected "over" but instead got ' + dargs[0]);
    assert.equal(arg2, 9000, 'Decorator got invalid value passed for the second argument of the method. Expected 9000 but instead got ' + dargs[1]);
    
    
    
    assert.ok(methodCalled, 'The method was not actually called.')
    assert.equal(arg1, 'over', 'Invalid value passed for the first argument of the method. Expected "over" but instead got ' + arg1);
    assert.equal(arg2, 9000, 'Invalid value passed for the second argument of the method. Expected 9000 but instead got ' + arg2);
    
  });
  
  it('method decorator argument are correct', function(){
    let dmethod = undefined, 
        dmethodName = undefined, 
        dargNames = undefined, 
        dscope = undefined;
    
    class ClassDecorator extends DummyDecorator {
      methodCalled(method, methodName, args, argNames, scope) {
        dmethod = method;
        dmethodName = methodName;
        dargNames = argNames;
        dscope = scope;
      }
    }
    
    let decorator = DECORATOR(ClassDecorator);
    
    class AClass {
      @decorator
      foo(strVal, numVal){}
    }
    
    new AClass().foo('forty', 2)
    
    
  });
  
});
