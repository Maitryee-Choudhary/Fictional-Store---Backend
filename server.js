const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const user = require('./routes/user');
const adminProduct = require('./routes/admin');
const product = require('./routes/product');
const cart = require('./routes/cart');
const order = require('./routes/order');

dotenv.config({path: './config/config.env'});
const PORT = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(express.json());
app.use('/api/user',user);

//product creation,deletion, updation, route by admin only
app.use('/api/product', adminProduct);

//anyone can access this route
app.use('/api/getProduct',product);

//loggedIn user can access the below route
app.use('/api/cart', cart);

app.use('/api/order',order);

app.listen(PORT, console.log(`Server ruuning at ${PORT}`));