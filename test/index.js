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
