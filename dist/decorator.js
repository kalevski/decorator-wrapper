'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _classDecoration = require('./classDecoration');

var _classDecoration2 = _interopRequireDefault(_classDecoration);

var _methodDecoration = require('./methodDecoration');

var _methodDecoration2 = _interopRequireDefault(_methodDecoration);

var _propertyDecoration = require('./propertyDecoration');

var _propertyDecoration2 = _interopRequireDefault(_propertyDecoration);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var crossover = function crossover(decoratorInstance, target, key, descriptor, decoratorArgs) {
    if (typeof target === 'function') {
        return (0, _classDecoration2.default)(target, key, descriptor, decoratorInstance, decoratorArgs);
    } else if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object' && typeof descriptor['value'] !== 'undefined') {
        return (0, _methodDecoration2.default)(target, key, descriptor, decoratorInstance, decoratorArgs);
    } else if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object' && typeof descriptor['initializer'] !== 'undefined') {
        return (0, _propertyDecoration2.default)(target, key, descriptor, decoratorInstance, decoratorArgs);
    }
};

exports.default = function (DecoratorClass) {
    var decoratorInstance = new DecoratorClass();
    if (typeof decoratorInstance['classDefined'] === 'undefined') {
        decoratorInstance['classDefined'] = function () {};
    } else if (typeof decoratorInstance['classInstanced'] === 'undefined') {
        decoratorInstance['classInstanced'] = function () {};
    } else if (typeof decoratorInstance['methodCalled'] === 'undefined') {
        decoratorInstance['methodCalled'] = function () {};
    } else if (typeof decoratorInstance['propertyInit'] === 'undefined') {
        decoratorInstance['propertyInit'] = function () {};
    }
    return function () {
        var _arguments = arguments;

        if (typeof arguments[0] === 'function' || _typeof(arguments[0]) === 'object') {
            return crossover(decoratorInstance, arguments[0], arguments[1], arguments[2], []);
        } else {
            return function (target, key, descriptor) {
                return crossover(decoratorInstance, target, key, descriptor, _arguments);
            };
        }
    };
};
//# sourceMappingURL=decorator.js.map