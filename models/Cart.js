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

const CartSchema = new mongoose.Schema({
    
    product_list:[item],
    user_id:{
        type:String,
        required: true
    },
    lastModified:{
       type:Date,
       default: Date.now()
    }
});


module.exports = mongoose.model('Cart', CartSchema);