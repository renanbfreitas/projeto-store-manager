const express = require('express');
const { productController } = require('../controllers');
const validateNameProduct = require('../middlewares/validateNameProduct');

const router = express.Router();

router.get('/', productController.getAllProducts);

router.get('/:id', productController.getProductsById);

router.post('/', validateNameProduct, productController.requestNewProduct);

module.exports = router;
