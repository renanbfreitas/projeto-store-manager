const { expect } = require("chai");
const sinon = require("sinon");
const { productModel } = require("../../../src/models");
const connection = require("../../../src/models/connection");
const { productsDB, listModel } = require("./mocks/product.model.mock");

describe('Testa as implementações da camada Model', () => {
  describe('Manipulação do store manager db', () => {
    afterEach(() => sinon.restore());

    it('1 - Resgatando a lista completa de produtos', async () => {
      sinon.stub(connection, 'execute').resolves([productsDB]);
      const request = await productModel.listAll();
      expect(request).to.be.deep.equal(listModel);
    });

    it('2 - Verificando se é possível localizar um carro através do ID', async function () {
      sinon.stub(connection, 'execute').resolves([[productsDB[2]]]);
      const request = await productModel.listById(3);
      expect(request).to.be.deep.equal(listModel[2]);
    });
  });
});