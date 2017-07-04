class NegociacaoService {

    obterNegociacoesDaSemana(cb) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'negociacoes/semana');
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    cb(null, JSON.parse(xhr.response)
                        .map(i => new Negociacao(new Date(i.data), i.quantidade, i.valor)));
                } else {
                    cb("Erro ao importar negociações", []);
                    console.log(xhr.responseText);
                }
            }
        };
        xhr.send();
    }
}
