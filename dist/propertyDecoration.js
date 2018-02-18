'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getParamNames = require('./helper/getParamNames');

var _getParamNames2 = _interopRequireDefault(_getParamNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (target, key, descriptor, decoratorInstance, decoratorArgs) {
    descriptor.initializer = function () {
        return decoratorInstance.propertyInit(key, descriptor, decoratorArgs);
    };
    return descriptor;
};
//# sourceMappingURL=propertyDecoration.js.map