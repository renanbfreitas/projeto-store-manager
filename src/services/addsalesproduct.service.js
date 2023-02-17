const salesService = require('./sales.service');
const { productModel, salesProductModel, salesModel } = require('../models');
const { validateNewSale, validateId } = require('./validations/validateInputs');
const saleModelMaks = require('../helpers/createSale');
const updateModelMask = require('../helpers/updateSales');

const validateProductId = async (ids) => {
  const productsList = await productModel.listAll();
  const productIds = productsList.map(({ id }) => id);
  const queryToSaleId = ids.map(({ productId }) => productId);
  if (queryToSaleId.every((id) => productIds.includes(id))) return true;
  return false;
};

const validateSale = (saleInfo) => {
  const validation = saleInfo.map((sale) => validateNewSale(sale));
  const error = validation.find(({ type }) => type);
  if (error) return error;
  return { type: null, message: '' };
};

const createNewSale = async (saleInfo) => {
  const error = validateSale(saleInfo);
  if (error.type) return error;

  const productExists = await validateProductId(saleInfo);

  if (productExists) {
    const saleId = await salesService.newSale();
    const createAllSales = saleInfo.map(async (sale) => {
    await salesProductModel.insert({ saleId, ...sale });
    });

    await Promise.all(createAllSales);
    const sale = saleModelMaks(saleId, saleInfo);
    return { type: null, message: sale };
  }

  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

const removedSales = async (id) => {
  const error = validateId(id);
  if (error.type) return error;

  const validateIfIdExists = await salesModel.listById(id);

  if (!validateIfIdExists || !validateIfIdExists.length) {
    return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  }

  await salesModel.removedSalesRegistry(id);
  await salesProductModel.removedSalesProduct(id);

  return { type: null };
};

const updateSales = async (saleId, saleToEdit) => {
  const error = validateSale(saleToEdit);
  if (error.type) return error;

  const productExists = await validateProductId(saleToEdit);
  const saleExists = await productModel.listById(saleId);
  if (!saleExists) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  if (saleExists && productExists) {
    const salesUpdated = saleToEdit.map(async (sale) => {
     await salesProductModel.update(saleId, sale);
    });

    await Promise.all(salesUpdated);
    const result = await updateModelMask(saleId, saleToEdit);
    return { type: null, message: result };
  }
  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

module.exports = {
  createNewSale,
  removedSales,
  updateSales,
};
