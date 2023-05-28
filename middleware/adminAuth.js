const jwt = require('jsonwebtoken')
const User = require('../models/User');
const adminAuth = async(req,res,next) => {
     
    //verify authentication
    const {authorization} = req.headers;

    if(!authorization)
    {
        return res.status(401).json({error:'Authorization required'});
    }

    const token = authorization.split(' ')[1];
    //console.log(token);

    try{
      const {_id} = jwt.verify(token, process.env.SECRET);
      req.user = await User.findOne({_id:_id});
      console.log(req.user);
      if(req.user.email !== "admin@gmail.com"){
        throw new Error("Only Admin can create a new product Item")
      }
      next();

    }catch(err){
      console.log(err);
      res.status(401).json({error:'Request is not authorised'});
    }
}

module.exports = adminAuth;