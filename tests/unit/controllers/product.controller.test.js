const Sinon = require("sinon");
const chai = require('chai');
const sinonChai = require('sinon-chai');
const { productController } = require("../../../src/controllers");
const { productService } = require("../../../src/services");
const { listController, resultInsert } = require("./mocks/product.controller.mock");

const { expect } = require('chai');
chai.use(sinonChai);

describe('Testa a função productController', () => {
  beforeEach(() => Sinon.restore());
  it('1 - Recuperando a lista de produtos', async () => {
    const req = {};
    const res = {};

    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns();

    Sinon
      .stub(productService, 'getAllProducts')
      .resolves({ type: null, message: listController });

    await productController.getAllProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(listController);
  });

  it('2 - Recuperando o produto através do ID', async () => {
    const res = {};
    const req = {
      params: { id: 1 },
    }

    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns();

    await productController.getProductsById(req, res);

    Sinon
      .stub(productService, 'getProductsById')
      .resolves({ type: null, message: listController[0] })
    expect(res.status).to.have.been.calledWith(200);
  });

  it('3 - Inserindo um novo produto no BD', async () => {
    const res = {}
    const req = {
      body: { name: "Manopla do Thanos" },
    }
    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns();

    await productController.requestNewProduct(req, res);

    Sinon
      .stub(productService, 'createProduct')
      .resolves({ type: null, message: resultInsert });

    expect(res.status).to.have.been.calledWith(201);
  });
});
