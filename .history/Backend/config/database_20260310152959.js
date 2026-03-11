const mongoose= require("mongoose");


const connectDb= async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("")
    } catch (error) {
        
    }
}