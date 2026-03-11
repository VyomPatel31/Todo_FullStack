const mongoose= require("mongoose");

const todoSchema= new mongoose.Schema({

});

module.exports= mongoose.model("Todo", todoSchema);