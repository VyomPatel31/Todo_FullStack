const mongoose= require("mongoose");


const connectDb= async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDb connected successfully")
    } catch (error) {
        console.log("error in the mongodb connection");
        process.exit(1);
        
    }
}

module.exports=connectDb;