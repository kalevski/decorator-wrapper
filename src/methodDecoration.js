import getParamNames from './helper/getParamNames';

export default (target, key, descriptor, decoratorInstance, decoratorArgs) => {
    let called = false;
    let methodFucntion = descriptor.value;
    let argNames = getParamNames(methodFucntion);
    let method = function(...args) {
        called = true;
        return methodFucntion.apply(this, args);
    };
    descriptor.value = function (...args) {
        let value = decoratorInstance.methodCalled(method, key, args, argNames, this, decoratorArgs);
        if (!called) {
            return method.apply(this, args);
        } else {
            return value;
        }
    };
    return descriptor;
}