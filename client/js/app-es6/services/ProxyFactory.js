export class ProxyFactory {

    static create(object, props, trap) {
        return new Proxy(object, {
            get(target, prop, receiver) {
                if (props.includes(prop) && ProxyFactory.isFunction(target[prop])) {
                    return function () {
                        let result = Reflect.apply(target[prop], target, arguments);
                        trap(object);
                        return result;
                    };
                }
                return Reflect.get(...arguments);
            },
            set(target, prop, value, receiver) {
                let result = Reflect.set(...arguments);
                if (props.includes(prop)) {
                    trap(target);
                }
                return result;
            }
        });
    }

    static isFunction(subject) {
        return typeof(subject) === typeof(Function);
    }
}
