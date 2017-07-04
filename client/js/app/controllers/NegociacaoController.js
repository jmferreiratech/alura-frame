class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacoesView')),
            'adiciona', 'limpa');
        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagemView')),
            'texto');
    }

    adiciona(event) {
        event.preventDefault();
        this._listaNegociacoes.adiciona(this._novaNegociacao());
        this._mensagem.texto = "Negociação adicionada com sucesso!";
        this._resetaForm();
    }

    importaNegociacoes() {
        let negociacaoService = new NegociacaoService();
        Promise.all([
            negociacaoService.obterNegociacoesDaSemana(),
            negociacaoService.obterNegociacoesDaSemanaAnterior(),
            negociacaoService.obterNegociacoesDaSemanaTrasada(),
        ]).then(results => {
            results
                .reduce((flat, result) => flat.concat(result), [])
                .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
            this._mensagem.texto = "Negociações importadas com sucesso.";
        }).catch(erro => this._mensagem.texto = erro);
    }

    limpa() {
        this._listaNegociacoes.limpa();
        this._mensagem.texto = "Negociações apagadas com sucesso!";
    }

    _novaNegociacao() {
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }

    _resetaForm() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0;

        this._inputData.focus();
    }
}
