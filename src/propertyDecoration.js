import getParamNames from './helper/getParamNames';

export default (target, key, descriptor, decoratorInstance, decoratorArgs) => {
    descriptor.initializer = function() {
        return decoratorInstance.propertyInit(key, descriptor, decoratorArgs);
    };
    return descriptor;
}