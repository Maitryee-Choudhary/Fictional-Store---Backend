const express = require('express');
const router = express.Router();
const {getProducts,getByName,getByCategory,getByDesc} = require('../controllers/productController');


router.get('/', getProducts);
router.get('/name/:query',getByName);
router.get('/desc/:query',getByDesc);
router.get('/category/:query',getByCategory);


module.exports = router;