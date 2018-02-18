export default (target, key, descriptor, decoratorInstance, decoratorArgs) => {
    let createInstance = (...args) => new target(...args);
    decoratorInstance.classDefined(target.name, createInstance, decoratorArgs);
    return (...args) => {
        let instance = decoratorInstance.classInstanced(target.name, args, createInstance, decoratorArgs);
        if (typeof instance === 'undefined') {
            instance = new target(...args);
        }
        return instance;
    };
}