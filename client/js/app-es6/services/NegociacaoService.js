import {HttpService} from "./HttpService";
import {ConnectionFactory} from "./ConnectionFactory";
import {Negociacao} from "../model/Negociacao";
import {NegociacaoDao} from "../daos/NegociacaoDao";

export class NegociacaoService {

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

    obterNegociacoes() {
        return Promise.all([
            this.obterNegociacoesDaSemana(),
            this.obterNegociacoesDaSemanaAnterior(),
            this.obterNegociacoesDaSemanaTrasada(),
        ]).then(results => results.reduce((flat, result) => flat.concat(result), []))
        .catch(erro => {throw erro;});
    }

    cadastra(negociacao) {
        return ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(negociacaoDao => negociacaoDao.adiciona(negociacao))
            .then(() => "Negociação adicionada com sucesso!")
            .catch(erro => {
                throw new Error(erro)
            });
    }

    lista() {
        return ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(negociacaoDao => negociacaoDao.listaTodos())
            .catch(erro => {
                throw new Error(erro)
            });
    }

    apaga() {
        return ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(negociacaoDao => negociacaoDao.apagaTodos())
            .then(() => "Negociações apagadas com sucesso!")
            .catch(erro => {
                throw new Error(erro)
            });
    }

    importa(listaAtual) {
        return this.obterNegociacoes()
            .then(negociacoes => negociacoes
                .filter(negociacao => !listaAtual.some(n => n.isEquals(negociacao))))
            .catch(erro => {
                throw new Error(erro)
            });
    }
}
