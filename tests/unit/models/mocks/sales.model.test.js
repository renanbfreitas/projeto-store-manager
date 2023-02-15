const { expect } = require("chai");
const Sinon = require("sinon");
const { salesModel } = require("../../../src/models");
const connection = require("../../../src/models/connection");
const { 
  salesDB,
  expetedResponse,
  allSalesById,
  responseAllSalesById,
  insertSalesModelMock,
} = require("./mocks/sales.model.mock");

describe('Teste de unidade em salesModel', () => {
  describe('Verificando a camada model', () => {
    afterEach(() => Sinon.restore());
    it('1 - Verificando se é possível adicionar uma nova venda à tabela "sales', async () => {
      Sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
      const result = await salesModel.insert(insertSalesModelMock);
      expect(result).to.equal(1);
    })

    it('2 - Verificando se é possível retornar a lista completa de vendas', async () => {
      Sinon.stub(connection, 'execute').resolves([salesDB]);
      const result = await salesModel.listAll();
      expect(result).to.be.deep.equal(expetedResponse);
    });

    it('3 - Verificando se é possível retornar uam venda específica pelo ID', async () => {
      Sinon.stub(connection, 'execute').resolves([[allSalesById[0]]]);
      const result = await salesModel.listById(1);
      expect(result).to.be.deep.equal(responseAllSalesById);
    });
  });
  });