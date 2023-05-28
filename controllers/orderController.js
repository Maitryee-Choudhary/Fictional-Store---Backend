const Order = require('../models/Order');
const Cart = require('../models/Cart');

//@desc place an Order --> POST
//@route /api/order --> POST method
const placeOrder = async(req,res,next)=>{
    try{
        const user_id = req.user._id;
        const cart = await Cart.find({user_id:user_id});
        console.log(cart);
        const response = await Order.create({user_id:user_id, product_list:cart[0].product_list,orderAt:Date.now()});
        //remove from cart the product list
        const delCart = await Cart.deleteOne({user_id:user_id});
        return res.status(201).json({
            success: true,
            data: response
          });
          next();
    }catch(e){
        if(e.name === 'ValidationError'){
            const messages = Object.values(e.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                error: messages
              });
        }
        else
            return res.status(500).json({
                success: false,
                error: 'Server Error'
              });
    }
}

//@desc fetch my order --> READ
//@route /api/order --> GET method
const fetchOrder = async(req,res,next)=>{
    const user_id = req.user._id;

    try{
       const orders = await Order.find({user_id:user_id}).sort({$natural:-1});

       return res.status(201).json({
        success: true,
        count: orders.length,
        data: orders
      });
      
    }catch(e){
        return res.status(500).json({
            success: false,
            error: 'Server Error'
          });
    }
}

module.exports = {
    placeOrder,
    fetchOrder
}