const Todo= require("../models/Todo");

// create the todo
exports.createTodo= async(req,res)=>{
    try {

        const {title}= req.body;

        const todo= await Todo.create({
            title, 
            user:req.user.id
        })
        res.status(200).json({
            success:true,
            message:"Todo created successfully",
            data:todo
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"error occuring in the todo creation"
        })
        
    }
}

// delete todo
exports.deleteTodo= async (req,res)=>{
    try {
        const {id}= req.params;

        
    } catch (error) {
        
    }
}

// update the todo
exports.updateTodo= async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
}

// get all the todos
exports.getAllTodos= async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
}