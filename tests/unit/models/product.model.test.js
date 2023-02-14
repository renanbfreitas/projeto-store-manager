const { expect } = require("chai");
const Sinon = require("sinon");
const { productModel } = require("../../../src/models");
const connection = require("../../../src/models/connection");
const { productsDB, listModel, newProduct } = require("./mocks/product.model.mock");

describe('Testa as implementações da camada Model', () => {
  describe('1 - Manipulação do store manager db', () => {
    afterEach(() => Sinon.restore());

    it('1 - Resgatando a lista completa de produtos', async () => {
      Sinon.stub(connection, 'execute').resolves([productsDB]);
      const request = await productModel.listAll();
      expect(request).to.be.deep.equal(listModel);
    });

    it('2 - Verificando se é possível localizar um carro através do ID', async function () {
      Sinon.stub(connection, 'execute').resolves([[productsDB[2]]]);
      const request = await productModel.listById(3);
      expect(request).to.be.deep.equal(listModel[2]);
    });
  });
});

describe('2 - Verificando a implementação de um produto no BD', () => {
    afterEach(() => Sinon.restore());
    it('Inserindo um produto no BD', async () => {
      Sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
      const request = await productModel.insert(newProduct);
      expect(request).to.equal(1);
    });
  });