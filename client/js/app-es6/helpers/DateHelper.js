export class DateHelper {

    constructor() {
        throw new Error('DateHelper cannot be instantiated');
    }

    static textoParaData(texto) {
        if(!/\d{4}-\d{2}-\d{2}/.test(texto))
            throw new Error('Deve estar no formato aaaa-mm-dd');

        return new Date(
            ...texto
                .split('-')
                .map((val, idx) => idx === 1 ? val - 1 : val));
    }

    static dataParaTexto(data) {
        return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`
    }
}
