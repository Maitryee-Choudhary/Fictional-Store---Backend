const jwt = require('jsonwebtoken')
const User = require('../models/User');
const userAuth = async(req,res,next) => {
     
    //verify authentication
    const {authorization} = req.headers;

    if(!authorization)
    {
        return res.status(401).json({error:'Authorization required'});
    }

    const token = authorization.split(' ')[1];
    console.log(token);

    try{
      const {_id} = jwt.verify(token, process.env.SECRET);
      req.user = await User.findOne({_id:_id}).select('_id');
      console.log(req.user);
      next()

    }catch(err){
      console.log(err);
      res.status(401).json({error:'Request is not auhtorised'});
    }
}

module.exports = userAuth;