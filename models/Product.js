const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    
    name:{
        type:String,
        required:[true,'Please enter name of product'],
        unique: true
    },
    desc:{
        type:String,
        required:[true,'Please enter desc'],
        unique: true
    },
    category:{
        type:String,
        required:[true,'Please enter category'],
    },
    price:{
        type:Number,
        required:[true,'Please enter price'],
    }
});


module.exports = mongoose.model('Product', ProductSchema);