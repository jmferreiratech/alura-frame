'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoService = function () {
    function NegociacaoService() {
        _classCallCheck(this, NegociacaoService);

        this._http = new HttpService();
    }

    _createClass(NegociacaoService, [{
        key: 'obterNegociacoesDaSemana',
        value: function obterNegociacoesDaSemana() {
            return this._http.get('negociacoes/semana').then(function (negociacoes) {
                return negociacoes.map(function (i) {
                    return new Negociacao(new Date(i.data), i.quantidade, i.valor);
                });
            }).catch(function (erro) {
                console.log(erro);
                throw new Error('Erro ao importar negociações da semana');
            });
        }
    }, {
        key: 'obterNegociacoesDaSemanaAnterior',
        value: function obterNegociacoesDaSemanaAnterior() {
            return this._http.get('negociacoes/anterior').then(function (negociacoes) {
                return negociacoes.map(function (i) {
                    return new Negociacao(new Date(i.data), i.quantidade, i.valor);
                });
            }).catch(function (erro) {
                console.log(erro);
                throw new Error('Erro ao importar negociações da semana anterior');
            });
        }
    }, {
        key: 'obterNegociacoesDaSemanaTrasada',
        value: function obterNegociacoesDaSemanaTrasada() {
            return this._http.get('negociacoes/retrasada').then(function (negociacoes) {
                return negociacoes.map(function (i) {
                    return new Negociacao(new Date(i.data), i.quantidade, i.valor);
                });
            }).catch(function (erro) {
                console.log(erro);
                throw new Error('Erro ao importar negociações da semana retrasada');
            });
        }
    }, {
        key: 'obterNegociacoes',
        value: function obterNegociacoes() {
            return Promise.all([this.obterNegociacoesDaSemana(), this.obterNegociacoesDaSemanaAnterior(), this.obterNegociacoesDaSemanaTrasada()]).then(function (results) {
                return results.reduce(function (flat, result) {
                    return flat.concat(result);
                }, []);
            }).catch(function (erro) {
                throw erro;
            });
        }
    }, {
        key: 'cadastra',
        value: function cadastra(negociacao) {
            return ConnectionFactory.getConnection().then(function (connection) {
                return new NegociacaoDao(connection);
            }).then(function (negociacaoDao) {
                return negociacaoDao.adiciona(negociacao);
            }).then(function () {
                return "Negociação adicionada com sucesso!";
            }).catch(function (erro) {
                throw new Error(erro);
            });
        }
    }, {
        key: 'lista',
        value: function lista() {
            return ConnectionFactory.getConnection().then(function (connection) {
                return new NegociacaoDao(connection);
            }).then(function (negociacaoDao) {
                return negociacaoDao.listaTodos();
            }).catch(function (erro) {
                throw new Error(erro);
            });
        }
    }, {
        key: 'apaga',
        value: function apaga() {
            return ConnectionFactory.getConnection().then(function (connection) {
                return new NegociacaoDao(connection);
            }).then(function (negociacaoDao) {
                return negociacaoDao.apagaTodos();
            }).then(function () {
                return "Negociações apagadas com sucesso!";
            }).catch(function (erro) {
                throw new Error(erro);
            });
        }
    }, {
        key: 'importa',
        value: function importa(listaAtual) {
            return this.obterNegociacoes().then(function (negociacoes) {
                return negociacoes.filter(function (negociacao) {
                    return !listaAtual.some(function (n) {
                        return n.isEquals(negociacao);
                    });
                });
            }).catch(function (erro) {
                throw new Error(erro);
            });
        }
    }]);

    return NegociacaoService;
}();
//# sourceMappingURL=NegociacaoService.js.map