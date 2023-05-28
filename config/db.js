const mongoose = require("mongoose");

const connectDB = async () => {
      try{
         const conn = await mongoose.connect(process.env.MONGO_URI,{
            useNewURLParser: true,
            useUnifiedTopology: true
         });
         console.log("MongoDb connected");
      }catch(e){
          console.log("DB has some error");
          process.exit(1);
      }
}

module.exports = connectDB;