const express = require('express');
const productController = require('../controller/product.controller');
const roleCheck = require('../middleware/roleChcek');
const router = express.Router();


router.post('/product/create', roleCheck, productController.createProduct);
router.get('/product/all', productController.getAllProducts)
router.get('/product/:id', productController.getProductById)
router.put('/product/update/:id',roleCheck, productController.updateProduct)
router.delete('/product/delete/:id', roleCheck, productController.deleteProduct)


module.exports = router;