const { productModel } = require('../models');
const { productService } = require('../services');
const { mapError } = require('../utils/errorMap');

const getAllProducts = async (_req, res) => {
  const { message } = await productService.getAllProducts();
  res.status(200).json(message);
};

const getProductsById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.getProductsById(id);

  if (type) return res.status(mapError(type)).json({ message });

  return res.status(200).json(message);
};

const requestNewProduct = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productService.createProduct(name);
  console.log(message);
  if (type) return res.status(mapError(type)).json(message);

  const result = await productModel.listById(message);

  return res.status(201).json(result);
};

const editProductDb = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { type, message } = await productService.updateProduct({ name, id });
  if (type) return res.status(mapError(type)).json({ message });

  return res.status(200).json(message);
};

const requestDelete = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.deleteProduct(id);

  if (type) return res.status(mapError(type)).json({ message });

  return res.status(204).end();
};

const findProductByName = async (req, res) => {
  const { q } = req.query;
  const { message } = await productService.queryProduct(q);
  return res.status(200).json(message);
};

module.exports = {
  getAllProducts,
  getProductsById,
  requestNewProduct,
  editProductDb,
  requestDelete,
  findProductByName,
};
