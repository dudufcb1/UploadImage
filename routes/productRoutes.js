// importamos modelos (paso 3)
//core modules
const express = require('express');
const router = express.Router();


const { createProduct, getAllProducts } = require('../controllers/productController');
const { uploadProductImage } = require('../controllers/uploadsController');


router.route('/').post(createProduct).get(getAllProducts);
router.route('/upload').post(uploadProductImage);

module.exports = router;