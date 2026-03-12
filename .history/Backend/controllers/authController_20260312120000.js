const User= require("../models/User");
const bcrypt= require("bcrypt");
const jwt= require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const OTP = require("../models/OTP");


require("dotenv").config();

// sign up
exports.signup= async(req, res)=>{
    try {

        const{name, email, password}= req.body

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

       if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    return res.status(400).json({
        success:false,
        message:"Invalid email format"
    })
}

        if (password.length < 8) {
            return res.status(400).json({
                success:false,
                message:"Password must be at least 8 characters"
            })
        }

        const existingUser= await User.findOne({email});

        if(existingUser){
          return res.status(400).json({
            success:false,
            message:"Email already registered"
          })
        }

        const hashedPassword= await bcrypt.hash(password, 10);

        // Generate OTP
        const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });

        const user= await User.create({
            name, 
            email, 
            password:hashedPassword,
            otp
        });

        // Send OTP via email
        const transporter = nodemailer.createTransporter({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'OTP for Email Verification',
            text: `Your OTP for email verification is: ${otp}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({
                    success: false,
                    message: "Error sending OTP email"
                });
            } else {
                console.log('Email sent:', info.response);
            }
        });

        res.status(201).json({
            success:true,
            message:"User registered successfully. Please check your email for OTP verification.",
            user: { id: user._id, name: user.name, email: user.email }
        });
        
    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({
            success:false,
            message:"Error during signup"
        })
    }
}

// login
exports.login= async(req, res)=>{
    try {
        const {email, password}= req.body

        if (!email || !password) {
            return res.status(400).json({
                success:false,
                message:"Email and password are required"
            })
        }

        const user= await User.findOne({email});

        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
        }

        const isMatch= await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(401).json({
                success:false,
                message:"Invalid password"
            })
        }
         const token = jwt.sign(
             { id: user._id },
             process.env.JWT_SECRET,
            { expiresIn: "1d" }
    );

       res.status(200).json({
        success: true,
        message: "Login successful",
        token,
        user: { id: user._id, name: user.name, email: user.email }
    });
        
    } catch (error) {
          console.error("Login error:", error);
          res.status(500).json({
            success:false,
            message:"Error during login"
        })
        
    }
}