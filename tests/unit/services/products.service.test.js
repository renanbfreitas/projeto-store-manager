const { expect } = require("chai");
const Sinon = require("sinon");
const { productModel } = require("../../../src/models");
const { productService } = require("../../../src/services");
const { productsDB, listModel } = require("../models/mocks/product.model.mock");
const { newItem, validReq, invalidReq } = require("./mocks/products.services.mock");

describe('Testa as implementações da camada do Products-Service', () => {
  describe('1 - Leitura e validação no store manager db', () => {
    beforeEach(() => {
      Sinon.stub(productModel, 'listAll').resolves([productsDB]);
    })
    afterEach(() => Sinon.restore());

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
    afterEach(() => Sinon.restore());
    it('3 - A lista de produtos é um array', async () => {
      Sinon.stub(productModel, 'listAll').resolves([productsDB[1]]);
      const products = await productService.getProductsById(2);
      expect(products.message).to.deep.equal(listModel[1]);
    });
  });

  describe('3 - Inserindo e validando informações', () => {
    afterEach(() => Sinon.restore());
    it('4 - Não retorna erro na requisição', async () => {
      Sinon.stub(productModel, 'insert').resolves(newItem);
      const response = await productService.createProduct(validReq)
      expect(response.type).to.equal(null);
    });
    it('5 - Retornando erro na requisição', async () => {
      Sinon.stub(productModel, 'insert').resolves(newItem);
      const response = await productService.createProduct(invalidReq)
      expect(response.type).to.equal('INVALID_NAME');
    });
  });
});