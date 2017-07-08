const ConnectionFactory = (function () {
    const stores = ['negociacoes'];
    const version = 1;
    const dbName = 'aluraframe';

    let connection = null;
    let close = null;

    return class ConnectionFactory {

        constructor() {
            throw new Error('DateHelper cannot be instantiated');
        }

        static getConnection() {
            return new Promise((resolve, reject) => {
                if (connection) {
                    resolve(connection);
                    return;
                }
                let openRequest = window.indexedDB.open(dbName, version);

                openRequest.onupgradeneeded = e => {
                    ConnectionFactory._criaStores(e.target.result);
                };
                openRequest.onsuccess = e => {
                    connection = e.target.result;
                    close = connection.close;
                    connection.close = () => {
                        throw new Error('Você não pode fechar diretamente a conexão');
                    };
                    resolve(connection);
                };
                openRequest.onerror = e => {
                    console.log(e.target.error);
                    reject(e.target.error.name);
                };
            });
        }

        static closeConnection(){
            if(connection){
                Reflect.apply(close, connection, []);
                connection = null;
            }
        }

        static _criaStores(connection) {
            stores.forEach(store => {
                if (connection.objectStoreNames.contains(store))
                    connection.deleteObjectStore(store);
                connection.createObjectStore(store, { autoIncrement: true });
            });
        }
    }
})();
