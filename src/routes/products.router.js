const express = require('express');
const { productController } = require('../controllers');
const validateNameProduct = require('../middlewares/validateNameProduct');

const router = express.Router();

router.get('/', productController.getAllProducts);

router.get('/search', productController.findProductByName);

router.get('/:id', productController.getProductsById);

router.post('/', validateNameProduct, productController.requestNewProduct);

router.put('/:id', validateNameProduct, productController.editProductDb);

router.delete('/:id', productController.requestDelete);

module.exports = router;
