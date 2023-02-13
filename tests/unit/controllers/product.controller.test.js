const sinon = require("sinon");
const chai = require('chai');
const sinonChai = require('sinon-chai');
const { productController } = require("../../../src/controllers");
const { productService } = require("../../../src/services");
const { listController } = require("./mocks/product.controller.mock");

const { expect } = require('chai');
chai.use(sinonChai);

describe('Testa a função productController', () => {
  it('1 - Recuperando a lista de produtos', async () => {
    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productService, 'getAllProducts').resolves({type: null, message: listController});

    await productController.getAllProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(listController);
  });

  it('2 - Recuperando o produto através do ID', async () => {
    const res = {};
    const req = {
      params: { id: 1 },
    }

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.getProductsById(req, res);

    sinon
      .stub(productService, 'getProductsById')
      .resolves({ type: null, message: listController[0] })
    expect(res.status).to.have.been.calledWith(200);
  });
});
