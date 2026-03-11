// instance of the express
const express= require("express");
const app= express();

// for the port import from the env file
require("dotenv").config();

app.use(express.json());
