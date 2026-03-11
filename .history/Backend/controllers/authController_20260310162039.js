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

        res.status(200).json({
            success:true,
            message:"User registered successfully",
            user
        });
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"error occur in the sign up "
        })
    }
}

// login
exports.login= async(res, req)=>{
    try {
        const {email, password}= req.body

        const user= await User.findOne({email});

        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not Found"
            })
        }

        const isMatch= 
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"error occur in the log in"
        })
        
    }
}