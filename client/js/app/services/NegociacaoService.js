class NegociacaoService {

    constructor() {
        this._http = new HttpService();
    }

    obterNegociacoesDaSemana() {
        return this._http.get('negociacoes/semana')
            .then(negociacoes => negociacoes.map(i => new Negociacao(new Date(i.data), i.quantidade, i.valor)))
            .catch(erro => {
                console.log(erro);
                throw new Error('Erro ao importar negociações da semana');
            });
    }

    obterNegociacoesDaSemanaAnterior() {
        return this._http.get('negociacoes/anterior')
            .then(negociacoes => negociacoes.map(i => new Negociacao(new Date(i.data), i.quantidade, i.valor)))
            .catch(erro => {
                console.log(erro);
                throw new Error('Erro ao importar negociações da semana anterior');
            });
    }

    obterNegociacoesDaSemanaTrasada() {
        return this._http.get('negociacoes/retrasada')
            .then(negociacoes => negociacoes.map(i => new Negociacao(new Date(i.data), i.quantidade, i.valor)))
            .catch(erro => {
                console.log(erro);
                throw new Error('Erro ao importar negociações da semana retrasada');
            });
    }
}
