const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();
const nameSchema = Joi.string().min(5).required();
const addSalesSchema = Joi.object({
  productId: idSchema,
  quantity: Joi.number().integer().min(1).required(),
});

const updateProductSchema = Joi.object({
  id: idSchema,
  name: nameSchema,
});

module.exports = {
  idSchema,
  nameSchema,
  addSalesSchema,
  updateProductSchema,
  };