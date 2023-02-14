const { salesService } = require('../services');
const { mapError } = require('../utils/errorMap');

const allSales = async (_req, res) => {
  const { message } = await salesService.getAllSales();
  res.status(200).json(message);
};

const salesById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.getSalesById(id);

  if (type) return res.status(mapError(type)).json({ message });

  return res.status(200).json(message);
};

module.exports = {
  allSales,
  salesById,
};