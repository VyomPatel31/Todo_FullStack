const express= require("express");
const router= express.Router();

const{ createTodo, updateTodo, deleteTodo, getAllTodos}= require("../controllers/todoController");

const {auth}= require("../middleware/authMiddleware");

router.post("/createTodo", auth, createTodo);

router.get("/", auth, getAllTodos);

router.put("/updateTodo", auth, updateTodo);

router.delete("/deleteTodo",auth, deleteTodo);

module.exports=router;
