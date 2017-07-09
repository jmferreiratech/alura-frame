class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacoesView')),
            'adiciona', 'limpa', 'ordena', 'inverteOrdem');
        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagemView')),
            'texto');

        this._ordemAtual = '';

        ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(negociacaoDao => negociacaoDao.listaTodos())
            .then(negociacoes => negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao)))
            .catch(erro => this._mensagem.texto = erro);
    }

    adiciona(event) {
        event.preventDefault();

        let novaNegociacao = this._novaNegociacao();
        ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(negociacaoDao => negociacaoDao.adiciona(novaNegociacao))
            .then(() => {
                this._listaNegociacoes.adiciona(novaNegociacao);
                this._mensagem.texto = "Negociação adicionada com sucesso!";
                this._resetaForm();
            })
            .catch(erro => this._mensagem.texto = erro);
    }

    importaNegociacoes() {
        let negociacaoService = new NegociacaoService();
        negociacaoService.obterNegociacoes()
            .then(results => {
                results.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                this._mensagem.texto = "Negociações importadas com sucesso.";
            })
            .catch(erro => this._mensagem.texto = erro);
    }

    limpa() {
        ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(negociacaoDao => negociacaoDao.apagaTodos())
            .then(() => {
                this._listaNegociacoes.limpa();
                this._mensagem.texto = "Negociações apagadas com sucesso!";
            })
            .catch(erro => this._mensagem.texto = erro);
    }

    ordena(coluna) {
        if (this._ordemAtual === coluna) {
            this._listaNegociacoes.inverteOrdem();
        } else {
            this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
        }
        this._ordemAtual = coluna;
    }

    _novaNegociacao() {
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value),
        );
    }

    _resetaForm() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0;

        this._inputData.focus();
    }
}
