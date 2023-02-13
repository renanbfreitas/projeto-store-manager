const { expect } = require("chai");
const sinon = require("sinon");
const { productModel } = require("../../../src/models");
const { productService } = require("../../../src/services");
const { productsDB, listModel } = require("../models/mocks/product.model.mock");

describe('Testa as implementações da camada do Products-Service', () => {
  describe('1 - Leitura e validação no store manager db', () => {
    beforeEach(() => {
      sinon.stub(productModel, 'listAll').resolves([productsDB]);
    })
    afterEach(() => sinon.restore());

    it('1 - Verificando se a lista de produtos é um array', async () => {
      const products = await productService.getAllProducts();
      expect(products.message instanceof Array).to.equal(true);
    });

    it('2 - Retornando a lista de produtos', async () => {
      const products = await productService.getAllProducts();
      expect(products.message).to.deep.equal([listModel]);
    });
  });

  describe('2 - Leitura específica no store manager db', () => {
    afterEach(() => sinon.restore());
    it('3 - A lista de produtos é um array', async () => {
      sinon.stub(productModel, 'listAll').resolves([productsDB[1]]);
      const products = await productService.getProductsById(2);
      expect(products.message).to.deep.equal(listModel[1]);
    });
  });
});