const { salesProductsService } = require('../services');
const { mapError } = require('../utils/errorMap');

const createNewSale = async (req, res) => {
  const saleInfo = req.body;
  console.log(saleInfo);
  const { type, message } = await salesProductsService.createNewSale(saleInfo);

  if (type) return res.status(mapError(type)).json({ message });

  return res.status(201).json(message);
};

const removedSales = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesProductsService.removedSales(id);

  if (type) return res.status(mapError(type)).json({ message });

  return res.status(204).end();
};

const updateSales = async (req, res) => {
  const { id } = req.params;
  const saleInfo = req.body;

  const { type, message } = await salesProductsService.updateSales(id, saleInfo);

  if (type) return res.status(mapError(type)).json({ message });
  return res.status(200).json(message);
};

module.exports = {
  createNewSale,
  removedSales,
  updateSales,
};
