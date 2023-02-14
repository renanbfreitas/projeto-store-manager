const validateSales = (req, res, next) => {
  const { productId, quantity } = req.body[0];
  if (!productId) {
    return res.status(400)
      .json({ message: '"productId" is required' });
  }

  if (quantity == null) {
    return res.status(400)
      .json({ message: '"quantity" is required' });
  }

  next();
};

module.exports = { validateSales };