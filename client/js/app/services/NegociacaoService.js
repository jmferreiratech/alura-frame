class NegociacaoService {

    obterNegociacoesDaSemana() {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'negociacoes/semana');
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.response)
                            .map(i => new Negociacao(new Date(i.data), i.quantidade, i.valor)));
                    } else {
                        reject("Erro ao importar negociações da semana");
                        console.log(xhr.responseText);
                    }
                }
            };
            xhr.send();
        });
    }

    obterNegociacoesDaSemanaAnterior() {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'negociacoes/anterior');
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.response)
                            .map(i => new Negociacao(new Date(i.data), i.quantidade, i.valor)));
                    } else {
                        reject("Erro ao importar negociações da semana anterior");
                        console.log(xhr.responseText);
                    }
                }
            };
            xhr.send();
        });
    }

    obterNegociacoesDaSemanaTrasada() {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'negociacoes/retrasada');
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.response)
                            .map(i => new Negociacao(new Date(i.data), i.quantidade, i.valor)));
                    } else {
                        reject("Erro ao importar negociações da semana retrasada");
                        console.log(xhr.responseText);
                    }
                }
            };
            xhr.send();
        });
    }
}
