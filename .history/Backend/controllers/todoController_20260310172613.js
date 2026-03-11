const Todo= require("../models/Todo");

// create the todo
exports.createTodo= async(req,res)=>{
    try {

        const {title, description}= req.body;

        const todo= await Todo.create({
            title, 
            user:req.user.id,
            description
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
   
         await Todo.findByIdAndDelete(id);

         res.status(200).json({
            success:true,
            message:"Todo Deleted"
         })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"error occuring in the deleting todo"
        })
        
    }
}

// update the todo
exports.updateTodo= async(req,res)=>{
    try {
        const {id}= req.params;

        const todo= await Todo.findByIdAndUpdate(
            id,
            req.body,
            {new: true}
        )
        res.status(200).json({
            success:true,
            message:"Todo updated successfully",
            data:todo
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"error in the update the todo"
        })
        
    }
}

// get all the todos
exports.getAllTodos= async(req,res)=>{
    try {
        const todos = await Todo.find({
      user: req.user.id
    });

    res.status(200).json({
        success:true,
        message:"get all the todos",
        data:todos
    })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"error during  fetch the user todos"
        })
        
    }
}