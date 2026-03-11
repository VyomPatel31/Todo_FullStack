// instance of the express
const express= require("express");
const app= express();

// for the port import from the env file
require("dotenv").config();


// for parsing the json data
app.use(express.json());

// for the database connection import first and then call it
const connectDb= require("./config/database");
connectDb();

// import routes
const authRoutes= require("./routes/authRoutes");
const todoRoutes= require("./routes/todoRoutes");

const port= process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`server is running on the port no ${port}`);
})