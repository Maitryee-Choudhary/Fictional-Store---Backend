const Product = require('../models/Product');

//@desc Get all products list --> Read
// @route /api/getProduct --> GET method
const getProducts = async(req,res,next) => {

    try{
        const products = await Product.find({});
        return res.status(201).json({
            success:true,
            count:products.length,
            data:products
        })
    }catch(e){
        return res.status(500).json({
            success: false,
            error: 'Server Error'
          });
    }
}

//@desc Create Product Item --> Create
// @route /api/getProduct --> POST Method
const addProduct = async(req,res,next) => {
    try{
        const {name, desc, category, price} = req.body;

        const response = await Product.create({name: name, desc: desc, category: category, price: price});
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

 //@desc   Delete product Item --> delete
//@route  /api/getProduct/:id --> DELETE method
const deleteProduct = async (req,res,next) => {
    // res.send('Get transaction');
    const _id = req.params.id;
    try{
        
        const response = await Product.findById({_id: _id});
        if(!response){
            return res.status(404).json({
                success: false,
                error: 'No product found'
              });
        }
        await Product.deleteOne({_id: _id});
         
        return res.status(200).json({
            success: true,
            data: {}
          });
          next();
     }catch(e){
        return res.status(500).json({
            success: false,
            error: 'Server Error'
          });
     }
 }

 //@desc update product item ---> Update
 //@route /api/getProduct/:id ---> PATCH method

 const updateProduct = async(req,res,next)=>{
    const _id = req.params.id;
    console.log(_id);
    try{
        const {name,desc,category, price} = req.body;
        
        const response = await Product.findByIdAndUpdate(_id,{
            $set: {
                name: req.body.name,
                desc:req.body.desc,
                category:req.body.category,
                price:req.body.price
            }
        });
        const updatedOne = await Product.findById(_id);
        
        // console.log(updatedOne);
        return res.status(201).json({
            success:true,
            data: updatedOne
        });
        next();
    }catch(err){
        return res.status(500).json({
            success: false,
            error: 'Server Error'
          });
    }
 }

 //@desc Get all products list by name --> Read
// @route /api/getProduct/name/ --> GET  
const getByName = async(req,res,next) => {
     
    const query = req.params.query;
    const regex = new RegExp(query,'i');

    try{
        const products = await Product.find({name:{$regex:regex}});
        return res.status(201).json({
            success:true,
            count:products.length,
            data:products
        })
    }catch(e){
        return res.status(500).json({
            success: false,
            error: 'Server Error'
          });
    }
}

 //@desc Get all products list by category --> Read
// @route /api/getProduct/category --> GET
const getByCategory = async(req,res,next) => {
     
    const query = req.params.query;
    const regex = new RegExp(query,'i');

    try{
        const products = await Product.find({category:{$regex:regex}});
        return res.status(201).json({
            success:true,
            count:products.length,
            data:products
        })
    }catch(e){
        return res.status(500).json({
            success: false,
            error: 'Server Error'
          });
    }
}

 //@desc Get all products list by desc --> Read
// @route /api/getProduct/desc --> GET
const getByDesc = async(req,res,next) => {
     
    const query = req.params.query;
    const regex = new RegExp(query,'i');

    try{
        const products = await Product.find({desc:{$regex:regex}});
        return res.status(201).json({
            success:true,
            count:products.length,
            data:products
        })
    }catch(e){
        return res.status(500).json({
            success: false,
            error: 'Server Error'
          });
    }
}

 module.exports = {
    addProduct,
    deleteProduct,
    getProducts,
    updateProduct,
    getByName,
    getByCategory,
    getByDesc
 }