const mongoose= require("mongoose");

const todoSchema= new mongoose.Schema({
      title:{
        type:String,
        trim:true,
        required:true
      },
      description:String,
      priority:{
        type:String,
        enum:['low','medium','high'],
        default:'medium'
      },
      dueDate:{
        type:String
      },
      completed:{
        type:Boolean,
        default:false
      },
      user:{
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true
      }
},
{
    timestamps:true
});

module.exports= mongoose.model("Todo", todoSchema);