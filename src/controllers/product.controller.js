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

module.exports = {
  getAllProducts,
  getProductsById,
  requestNewProduct,
};
