const mongoose= require("mongoose");

const todoSchema= new mongoose.Schema({
      title:{
        type:String,
        trim:true,
        required:true
      },
      completed:{
        type:Boolean,
        default:false
      },
      User:{
        
      }
});

module.exports= mongoose.model("Todo", todoSchema);