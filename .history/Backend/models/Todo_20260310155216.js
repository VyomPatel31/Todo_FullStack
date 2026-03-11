const mongoose= require("mongoose");

const todoSchema= new mongoose.Schema({
      title:{
        type:String,
        trim:true,
        required:true
      },
      
});

module.exports= mongoose.model("Todo", todoSchema);