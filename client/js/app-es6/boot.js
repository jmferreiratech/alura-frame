import {instance} from "./controllers/NegociacaoController";
import {} from "./polyfill/fetch";

const negociacaoController = instance();
document.querySelector('.form').onsubmit = negociacaoController.adiciona.bind(negociacaoController);
document.querySelector('[type=button]').onclick = negociacaoController.limpa.bind(negociacaoController);
