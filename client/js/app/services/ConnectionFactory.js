'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConnectionFactory = function () {
    var stores = ['negociacoes'];
    var version = 1;
    var dbName = 'aluraframe';

    var connection = null;
    var close = null;

    return function () {
        function ConnectionFactory() {
            _classCallCheck(this, ConnectionFactory);

            throw new Error('DateHelper cannot be instantiated');
        }

        _createClass(ConnectionFactory, null, [{
            key: 'getConnection',
            value: function getConnection() {
                return new Promise(function (resolve, reject) {
                    if (connection) {
                        resolve(connection);
                        return;
                    }
                    var openRequest = window.indexedDB.open(dbName, version);

                    openRequest.onupgradeneeded = function (e) {
                        ConnectionFactory._criaStores(e.target.result);
                    };
                    openRequest.onsuccess = function (e) {
                        connection = e.target.result;
                        close = connection.close;
                        connection.close = function () {
                            throw new Error('Você não pode fechar diretamente a conexão');
                        };
                        resolve(connection);
                    };
                    openRequest.onerror = function (e) {
                        console.log(e.target.error);
                        reject(e.target.error.name);
                    };
                });
            }
        }, {
            key: 'closeConnection',
            value: function closeConnection() {
                if (connection) {
                    Reflect.apply(close, connection, []);
                    connection = null;
                }
            }
        }, {
            key: '_criaStores',
            value: function _criaStores(connection) {
                stores.forEach(function (store) {
                    if (connection.objectStoreNames.contains(store)) connection.deleteObjectStore(store);
                    connection.createObjectStore(store, { autoIncrement: true });
                });
            }
        }]);

        return ConnectionFactory;
    }();
}();
//# sourceMappingURL=ConnectionFactory.js.map