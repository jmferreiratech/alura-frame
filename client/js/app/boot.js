"use strict";

System.register(["./controllers/NegociacaoController", "./polyfill/fetch"], function (_export, _context) {
  "use strict";

  var instance, negociacaoController;
  return {
    setters: [function (_controllersNegociacaoController) {
      instance = _controllersNegociacaoController.instance;
    }, function (_polyfillFetch) {}],
    execute: function () {
      negociacaoController = instance();

      document.querySelector('.form').onsubmit = negociacaoController.adiciona.bind(negociacaoController);
      document.querySelector('[type=button]').onclick = negociacaoController.limpa.bind(negociacaoController);
    }
  };
});
//# sourceMappingURL=boot.js.map