const { salesProductsService } = require('../services');
const { mapError } = require('../utils/errorMap');

const createNewSale = async (req, res) => {
  const saleInfo = req.body;
  console.log(saleInfo);
  const { type, message } = await salesProductsService.createNewSale(saleInfo);

  if (type) return res.status(mapError(type)).json({ message });

  return res.status(201).json(message);
};

module.exports = {
  createNewSale,
};