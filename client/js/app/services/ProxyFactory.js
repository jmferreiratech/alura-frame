"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProxyFactory = function () {
    function ProxyFactory() {
        _classCallCheck(this, ProxyFactory);
    }

    _createClass(ProxyFactory, null, [{
        key: "create",
        value: function create(object, props, trap) {
            return new Proxy(object, {
                get: function get(target, prop, receiver) {
                    if (props.includes(prop) && ProxyFactory.isFunction(target[prop])) {
                        return function () {
                            var result = Reflect.apply(target[prop], target, arguments);
                            trap(object);
                            return result;
                        };
                    }
                    return Reflect.get.apply(Reflect, arguments);
                },
                set: function set(target, prop, value, receiver) {
                    var result = Reflect.set.apply(Reflect, arguments);
                    if (props.includes(prop)) {
                        trap(target);
                    }
                    return result;
                }
            });
        }
    }, {
        key: "isFunction",
        value: function isFunction(subject) {
            return (typeof subject === "undefined" ? "undefined" : _typeof(subject)) === (typeof Function === "undefined" ? "undefined" : _typeof(Function));
        }
    }]);

    return ProxyFactory;
}();
//# sourceMappingURL=ProxyFactory.js.map