'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (target, key, descriptor, decoratorInstance, decoratorArgs) {
    var createInstance = function createInstance() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return new (Function.prototype.bind.apply(target, [null].concat(args)))();
    };
    decoratorInstance.classDefined(target.name, createInstance, decoratorArgs);
    return function () {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        var instance = decoratorInstance.classInstanced(target.name, args, createInstance, decoratorArgs);
        if (typeof instance === 'undefined') {
            instance = new (Function.prototype.bind.apply(target, [null].concat(args)))();
        }
        return instance;
    };
};
//# sourceMappingURL=classDecoration.js.map