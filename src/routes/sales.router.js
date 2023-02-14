const express = require('express');
const { saleController, addSalesProductController } = require('../controllers');
const { validateSales } = require('../middlewares/validateSales');

const router = express.Router();

router.get('/', saleController.allSales);

router.get('/:id', saleController.salesById);

router.post('/', validateSales, addSalesProductController.createNewSale);

module.exports = router;