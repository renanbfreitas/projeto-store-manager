const { productModel } = require('../models');
const { validateId, validateName, validateProductUpdate } = require('./validations/validateInputs');

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

const updateProduct = async (productToEdit) => {
  const error = await validateProductUpdate(productToEdit);
  if (error.type) return error;

  const product = await productModel.listById(productToEdit.id);

  if (!product) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }

  await productModel.update(productToEdit);
  return { type: null, message: productToEdit };
};

const deleteProduct = async (id) => {
  const error = validateId(id);
  if (error.type) return error;

  const validateIfIdExists = await productModel.listById(id);

  if (!validateIfIdExists) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  await productModel.deleteProduct(id);
  return { type: null };
};

const queryProductSearch = async (q = '') => {
  const string = `%${q}%`;
  const product = await productModel.findByQuery(string);
  return { type: null, message: product };
};

module.exports = {
  getAllProducts,
  getProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
  queryProductSearch,
};
