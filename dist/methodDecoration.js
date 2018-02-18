'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getParamNames = require('./helper/getParamNames');

var _getParamNames2 = _interopRequireDefault(_getParamNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (target, key, descriptor, decoratorInstance, decoratorArgs) {
    var called = false;
    var methodFucntion = descriptor.value;
    var argNames = (0, _getParamNames2.default)(methodFucntion);
    var method = function method() {
        called = true;

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return methodFucntion.apply(this, args);
    };
    descriptor.value = function () {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        var value = decoratorInstance.methodCalled(method, key, args, argNames, this, decoratorArgs);
        if (!called) {
            return method.apply(this, args);
        } else {
            return value;
        }
    };
    return descriptor;
};
//# sourceMappingURL=methodDecoration.js.map