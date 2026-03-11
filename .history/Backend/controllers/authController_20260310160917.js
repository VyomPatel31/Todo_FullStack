const User= require("../models/User");
const bcrypt= require("bcrypt");
const jwt= require("jsonwebtoken");

// sign up
exports.signup= async(req, res)=>{
    try {

        const{name, email, password}= req.body

        const existingUser= await User.findOne({email});

        if(existingUser){
          return res.status(400).json({
            success:false,
            message:"User already exist"
          })
        }

        const hashedPassword= await bcrypt.hash(password, 10);

        const user= await User.create({
            name, 
            email, 
            password:hashedPassword
        });

        r
        
    } catch (error) {
        
    }
}