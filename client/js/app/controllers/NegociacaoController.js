class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($('#negociacoesView')), 'adiciona', 'limpa', 'ordena', 'inverteOrdem');
        this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'texto');

        this._ordemAtual = '';
        this._service = new NegociacaoService();

        this._init();
    }

    adiciona(event) {
        event.preventDefault();

        let novaNegociacao = this._novaNegociacao();
        this._service.cadastra(novaNegociacao).then(() => {
            this._listaNegociacoes.adiciona(novaNegociacao);
            this._mensagem.texto = "Negociação adicionada com sucesso!";
            this._resetaForm();
        }).catch(erro => this._mensagem.texto = erro);
    }

    limpa() {
        this._service.apaga().then(msg => {
            this._listaNegociacoes.limpa();
            this._mensagem.texto = msg;
        }).catch(erro => this._mensagem.texto = erro);
    }

    ordena(coluna) {
        if (this._ordemAtual === coluna) {
            this._listaNegociacoes.inverteOrdem();
        } else {
            this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
        }
        this._ordemAtual = coluna;
    }

    _init() {
        this._service.lista().then(negociacoes => negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))).catch(erro => this._mensagem.texto = erro);

        setInterval(() => this._importaNegociacoes(), 3000);
    }

    _importaNegociacoes() {
        this._service.importa(this._listaNegociacoes.negociacoes).then(results => {
            results.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
            this._mensagem.texto = "Negociações importadas com sucesso.";
        }).catch(erro => this._mensagem.texto = erro);
    }

    _novaNegociacao() {
        return new Negociacao(DateHelper.textoParaData(this._inputData.value), parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));
    }

    _resetaForm() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0;

        this._inputData.focus();
    }
}
//# sourceMappingURL=NegociacaoController.js.map