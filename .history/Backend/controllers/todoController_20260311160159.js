const Todo= require("../models/Todo");

// create the todo
exports.createTodo= async(req,res)=>{
    try {

        const {title, description, priority, dueDate}= req.body;

        if (!title || title.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Title is required"
            });
        }

        const todo= await Todo.create({
            title, 
            user:req.user.id,
            description,
            priority,
            dueDate
        })
        res.status(200).json({
            success:true,
            message:"Todo created successfully",
            data:todo
        })
        
    } catch (error) {
        console.error("Create todo error:", error);
        res.status(500).json({
            success:false,
            message:"Error creating todo"
        })
        
    }
}

// delete todo
exports.deleteTodo= async (req,res)=>{
    try {
        const {id}= req.params;
        
        const todo = await Todo.findById(id);
        
        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found"
            });
        }

        // Check ownership
        if (todo.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized to delete this todo"
            });
        }

        await Todo.findByIdAndDelete(id);

        res.status(200).json({
            success:true,
            message:"Todo deleted successfully"
        })
    } catch (error) {
        console.error("Delete todo error:", error);
        res.status(500).json({
            success:false,
            message:"Error deleting todo"
        })
        
    }
}

// update the todo
exports.updateTodo= async(req,res)=>{
    try {
        const {id}= req.params;

        const todo = await Todo.findById(id);
        
        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found"
            });
        }

        // Check ownership
        if (todo.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized to update this todo"
            });
        }

        const updatedTodo= await Todo.findByIdAndUpdate(
            id,
            req.body,
            {new: true}
        )
        res.status(200).json({
            success:true,
            message:"Todo updated successfully",
            data:updatedTodo
        })
        
    } catch (error) {
        console.error("Update todo error:", error);
        res.status(500).json({
            success:false,
            message:"Error updating todo"
        })
        
    }
}

// get all the todos
exports.getAllTodos= async(req,res)=>{
    try {
        const todos = await Todo.find({
            user: req.user.id
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success:true,
            message:"Todos fetched successfully",
            data:todos
        })
        
    } catch (error) {
        console.error("Fetch todos error:", error);
        res.status(500).json({
            success:false,
            message:"Error fetching todos"
        })
        
    }
}