import classDecoration from './classDecoration';
import methodDecoration from './methodDecoration';
import propertyDecoration from './propertyDecoration';

let crossover = (decoratorInstance, target, key, descriptor, decoratorArgs) => {
    if (typeof target === 'function') {
        return classDecoration(target, key, descriptor, decoratorInstance, decoratorArgs);
    } else if (typeof target === 'object' && typeof descriptor['value'] !== 'undefined') {
        return methodDecoration(target, key, descriptor, decoratorInstance, decoratorArgs);
    } else if (typeof target === 'object' && typeof descriptor['initializer'] !== 'undefined') {
        return propertyDecoration(target, key, descriptor, decoratorInstance, decoratorArgs);
    }
}

export default (DecoratorClass) => {
    let decoratorInstance = new DecoratorClass();
    if (typeof decoratorInstance['classDefined'] === 'undefined') {
        decoratorInstance['classDefined'] = function(){};
    } else if (typeof decoratorInstance['classInstanced'] === 'undefined') {
        decoratorInstance['classInstanced'] = function(){};
    } else if (typeof decoratorInstance['methodCalled'] === 'undefined') {
        decoratorInstance['methodCalled'] = function(){};
    } else if (typeof decoratorInstance['propertyInit'] === 'undefined') {
        decoratorInstance['propertyInit'] = function(){};
    }
    return function () {
        if (typeof arguments[0] === 'function' || typeof arguments[0] === 'object') {
            return crossover(decoratorInstance, arguments[0], arguments[1], arguments[2], []);
        } else {
            return (target, key, descriptor) => {
                return crossover(decoratorInstance, target, key, descriptor, arguments);
            }
        }
    }
};