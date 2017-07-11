"use strict";

System.register(["../model/Negociacao", "../model/ListaNegociacoes", "../model/Mensagem", "../views/NegociacoesView", "../views/MensagemView", "../services/NegociacaoService", "../helpers/Bind", "../helpers/DateHelper"], function (_export, _context) {
    "use strict";

    var Negociacao, ListaNegociacoes, Mensagem, NegociacoesView, MensagemView, NegociacaoService, Bind, DateHelper, _createClass, NegociacaoController, controller;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_modelNegociacao) {
            Negociacao = _modelNegociacao.Negociacao;
        }, function (_modelListaNegociacoes) {
            ListaNegociacoes = _modelListaNegociacoes.ListaNegociacoes;
        }, function (_modelMensagem) {
            Mensagem = _modelMensagem.Mensagem;
        }, function (_viewsNegociacoesView) {
            NegociacoesView = _viewsNegociacoesView.NegociacoesView;
        }, function (_viewsMensagemView) {
            MensagemView = _viewsMensagemView.MensagemView;
        }, function (_servicesNegociacaoService) {
            NegociacaoService = _servicesNegociacaoService.NegociacaoService;
        }, function (_helpersBind) {
            Bind = _helpersBind.Bind;
        }, function (_helpersDateHelper) {
            DateHelper = _helpersDateHelper.DateHelper;
        }],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            NegociacaoController = function () {
                function NegociacaoController() {
                    _classCallCheck(this, NegociacaoController);

                    var $ = document.querySelector.bind(document);

                    this._inputData = $('#data');
                    this._inputQuantidade = $('#quantidade');
                    this._inputValor = $('#valor');

                    this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($('#negociacoesView')), 'adiciona', 'limpa', 'ordena', 'inverteOrdem');
                    this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'texto');

                    this._ordemAtual = '';
                    this._service = new NegociacaoService();

                    this._init();
                }

                _createClass(NegociacaoController, [{
                    key: "adiciona",
                    value: function adiciona(event) {
                        var _this = this;

                        event.preventDefault();

                        var novaNegociacao = this._novaNegociacao();
                        this._service.cadastra(novaNegociacao).then(function () {
                            _this._listaNegociacoes.adiciona(novaNegociacao);
                            _this._mensagem.texto = "Negociação adicionada com sucesso!";
                            _this._resetaForm();
                        }).catch(function (erro) {
                            return _this._mensagem.texto = erro;
                        });
                    }
                }, {
                    key: "limpa",
                    value: function limpa() {
                        var _this2 = this;

                        this._service.apaga().then(function (msg) {
                            _this2._listaNegociacoes.limpa();
                            _this2._mensagem.texto = msg;
                        }).catch(function (erro) {
                            return _this2._mensagem.texto = erro;
                        });
                    }
                }, {
                    key: "ordena",
                    value: function ordena(coluna) {
                        if (this._ordemAtual === coluna) {
                            this._listaNegociacoes.inverteOrdem();
                        } else {
                            this._listaNegociacoes.ordena(function (a, b) {
                                return a[coluna] - b[coluna];
                            });
                        }
                        this._ordemAtual = coluna;
                    }
                }, {
                    key: "_init",
                    value: function _init() {
                        var _this3 = this;

                        this._service.lista().then(function (negociacoes) {
                            return negociacoes.forEach(function (negociacao) {
                                return _this3._listaNegociacoes.adiciona(negociacao);
                            });
                        }).catch(function (erro) {
                            return _this3._mensagem.texto = erro;
                        });

                        setInterval(function () {
                            return _this3._importaNegociacoes();
                        }, 3000);
                    }
                }, {
                    key: "_importaNegociacoes",
                    value: function _importaNegociacoes() {
                        var _this4 = this;

                        this._service.importa(this._listaNegociacoes.negociacoes).then(function (results) {
                            results.forEach(function (negociacao) {
                                return _this4._listaNegociacoes.adiciona(negociacao);
                            });
                            _this4._mensagem.texto = "Negociações importadas com sucesso.";
                        }).catch(function (erro) {
                            return _this4._mensagem.texto = erro;
                        });
                    }
                }, {
                    key: "_novaNegociacao",
                    value: function _novaNegociacao() {
                        return new Negociacao(DateHelper.textoParaData(this._inputData.value), parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));
                    }
                }, {
                    key: "_resetaForm",
                    value: function _resetaForm() {
                        this._inputData.value = '';
                        this._inputQuantidade.value = 1;
                        this._inputValor.value = 0;

                        this._inputData.focus();
                    }
                }]);

                return NegociacaoController;
            }();

            controller = new NegociacaoController();
            function instance() {
                return controller;
            }

            _export("instance", instance);
        }
    };
});
//# sourceMappingURL=NegociacaoController.js.map