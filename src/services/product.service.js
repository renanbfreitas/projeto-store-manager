const { productModel } = require('../models');
const { validateId, validateName } = require('./validations/validateInputs');

const getAllProducts = async () => {
  const result = await productModel.listAll();

  if (!result) return { type: null, message: 'Nao há produto(s) cadastrado(s)' };

  return { type: null, message: result };
};

const getProductsById = async (id) => {
  const error = validateId(id);
  if (error.type) return error;

  const result = await productModel.listById(id);

  if (!result) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: result };
};

const createProduct = async (name) => {
  const error = validateName(name);
  if (error.type) return error;

  const result = await productModel.insert({ name });

  return { type: null, message: result };
};

module.exports = {
  getAllProducts,
  getProductsById,
  createProduct,
};
