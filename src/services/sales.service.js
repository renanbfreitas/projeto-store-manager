const { salesModel } = require('../models');
const { validateId } = require('./validations/validateInputs');
const timestamp = require('../utils/timestamp');

const newSale = async () => {
  const currentDate = timestamp();
  const sale = await salesModel.insert(currentDate);
  return sale;
};

const getAllSales = async () => {
  const result = await salesModel.listAll();

  if (!result) return { type: null, message: 'There\'s no sales yet' };

  return { type: null, message: result };
};

const getSalesById = async (id) => {
  const error = validateId(id);

  if (error.type) return error;

  const result = await salesModel.listById(id);

  if (!result || !result.length) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  return { type: null, message: result };
};

module.exports = {
  newSale,
  getAllSales,
  getSalesById,
};