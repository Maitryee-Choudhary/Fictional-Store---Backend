const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');
const {addProduct, deleteProduct, updateProduct} = require('../controllers/productController');

//require auth for all routers ahead
router.use(adminAuth);

router.post('/', addProduct);
router.delete('/:id', deleteProduct);
router.patch('/:id',updateProduct);


module.exports = router;