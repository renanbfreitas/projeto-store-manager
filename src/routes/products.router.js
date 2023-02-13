const express = require('express');
const { productController } = require('../controllers');
const { productModel } = require('../models');

const router = express.Router();

router.get('/', productController.getAllProducts);

router.get('/:id', productController.getProductsById);

router.post('/', async (req, res) => {
  const { name } = req.body;
  const request = await productModel.insert({ name });
  const result = await productModel.listById(request);

  return res.status(201).json(result);
});

module.exports = router;
