const express = require('express');
const router = express.Router();
const userAuth = require('../middleware/userAuth');
const {placeOrder,fetchOrder} = require('../controllers/orderController');

//require auth for all routers ahead
router.use(userAuth);

router.post('/',placeOrder);
router.get('/',fetchOrder);


module.exports = router;