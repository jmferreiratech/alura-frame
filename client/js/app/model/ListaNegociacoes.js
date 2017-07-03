class ListaNegociacoes {

    constructor(armadilha) {
        this._listaNegociacoes = [];
        this._armadilha = armadilha;
    }

    adiciona(negociacao) {
        this._listaNegociacoes.push(negociacao);
        this._armadilha(this);
    }

    get negociacoes() {
        return [].concat(this._listaNegociacoes);
    }

    limpa() {
        this._listaNegociacoes = [];
        this._armadilha(this);
    }
}
