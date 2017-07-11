export class Mensagem {

    constructor(texto = '') {
        this._texto = texto;
    }

    get texto() {
        return this._texto;
    }

    set texto(valor) {
        this._texto = valor;
    }
}
