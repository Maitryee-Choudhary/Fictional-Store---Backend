const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name:{
        type:String,
        required:true
    }
});

//static SignUp Method
userSchema.statics.signup = async function (name,email,password) {
      
    //validation
    try{
        if(!email || !password || !name) {
            throw Error("All fields must be filled");
        }
        if(!validator.isEmail(email)){
            throw Error("Email is invalid");
        }
        const exist = await this.findOne({email : email});
        if(exist) {
            throw Error("Email already in use");
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
    
        const user = await this.create({email : email, password : hash, name:name});
        return user;
    }catch(Error)
    {
        return Error;
    }
   
    // try{
    //         if(!validator.isStrongPassword(password)){
    //         throw Error("Password not strong enough");
    //     }
    // }catch(Error)
    // {
    //     return Error;
    // }
    

  
   

}

//static login 
userSchema.statics.login = async function(email,password){
     //validation
     try{
        if(!email || !password) {
            throw Error("All fields must be filled");
        }
        const user = await this.findOne({email : email});
        if(!user) {
            throw Error("Email not exist");
        }
        const match = await bcrypt.compare(password,user.password);
        if(!match) {
            throw Error("Incorrect password");
        }
        return user;
    }catch(Error)
    {
        return Error;
    }
  
}



module.exports = mongoose.model('User', userSchema);