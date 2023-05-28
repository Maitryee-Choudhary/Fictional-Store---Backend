const mongoose = require('mongoose');

const item = new mongoose.Schema ({
    prod_id:{
        type:String,
        required: true
    },
    qty:{
        type:Number,
        required:true
    }
});

const OrderSchema = new mongoose.Schema({
    
    product_list:[item],
    user_id:{
        type:String,
        required: true
    },
    orderAt:{
       type:Date,
       default: Date.now()
    }
});


module.exports = mongoose.model('Order', OrderSchema);