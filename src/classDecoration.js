export default (target, key, descriptor, decoratorInstance, decoratorArgs) => {
    let createInstance = (...args) => new target(...args);
    decoratorInstance.classDefined(target.name, createInstance, decoratorArgs);
    let wrapped_type = (...args) => {
        let instance = decoratorInstance.classInstanced(target.name, args, createInstance, decoratorArgs);
        if (typeof instance === 'undefined') {
            instance = new target(...args);
        }
        return instance;
    };
    
    wrapped_type.prototype = target.prototype; // making sure 'instanceof' recognizes the object type
    return wrapped_type;
}
