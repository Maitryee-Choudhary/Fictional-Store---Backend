const express = require('express');
const router = express.Router();
const userAuth = require('../middleware/userAuth');
const {addToCart,getCartList} = require('../controllers/cartController');

//require auth for all routers ahead
router.use(userAuth);

router.post('/',addToCart);
router.get('/',getCartList);


module.exports = router;