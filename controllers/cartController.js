const Cart = require('../models/Cart');


//@desc add to Cart --> Create
//@route /api/cart --> POST method
const addToCart = async(req,res,next)=>{

    try{
        const user_id = req.user._id;
        const {product_list} = req.body;
        console.log(product_list);
       
       // const response = await Cart.create({product_list, user_id:user_id,lastModified:Date.now()})
        
       const response = await Cart.find({user_id:user_id});
       if(response.length === 0){
        const response = await Cart.create({product_list, user_id:user_id,lastModified:Date.now()});
        return res.status(201).json({
            success: true,
            data: response
        }); 
       }else
       {
            const updates = await Cart.findByIdAndUpdate(response[0]._id,{
            $push:{
                product_list: product_list,
            },
            $set:{
                lastModified:Date.now()
            }
        });
        
        const updated = await Cart.find({user_id:user_id});
        return res.status(201).json({
            success: true,
            data: updated
        });  
       }
    
        }catch(e){
                return res.status(500).json({
                    success: false,
                    error: 'Server Error'
                  });
        }
}

//@desc   Get cart list --> Read
//@route  /api/order/  --> GET Method
const getCartList = async (req,res,next) => {
    //    res.send('Get transaction');
       const user_id = req.user._id;
    
        try{
           const cartList = await Cart.find({user_id:user_id}).sort({$natural:-1});
    
           return res.status(201).json({
            success: true,
            count: cartList.length,
            data: cartList
          });
          next();
        }catch(e){
            return res.status(500).json({
                success: false,
                error: 'Server Error'
              });
        }
       
}




module.exports={
    addToCart,
    getCartList 

}