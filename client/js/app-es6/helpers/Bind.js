import {ProxyFactory} from "../services/ProxyFactory";

export class Bind {

    constructor(model, view, ...props) {
        view.update(model);
        return ProxyFactory.create(
            model,
            props,
            model => view.update(model));
    }
}
