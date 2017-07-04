class ListaNegociacoes {

    constructor() {
        this._listaNegociacoes = [];
    }

    adiciona(negociacao) {
        this._listaNegociacoes.push(negociacao);
    }

    get negociacoes() {
        return [].concat(this._listaNegociacoes);
    }

    get volumeTotal() {
        return this._listaNegociacoes.reduce((acc, n) => acc + n.volume, 0.0);
    }

    limpa() {
        this._listaNegociacoes = [];
    }
}
