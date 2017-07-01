class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
    }

    adiciona(event) {
        event.preventDefault();
        console.log(this.negociacao());
        this.resetaForm();
    }

    negociacao() {
        let date = new Date(
            ...this._inputData.value
                .split('-')
                .map((val, idx) => idx === 1 ? val - 1 : val));

        return new Negociacao(
            date,
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }

    resetaForm() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0;

        this._inputData.focus();
    }
}
