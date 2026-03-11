const Todo= require("../models/Todo");

// create the todo
exports.createTodo= async(req,res)=>{
    try {

        const {title}= req.body;

        const todo= await Todo.create({
            
        })
        
    } catch (error) {
        
    }
}

// delete todo
exports.deleteTodo= async (req,res)=>{
    try {
        
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