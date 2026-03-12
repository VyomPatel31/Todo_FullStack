const jwt = require("jsonwebtoken");

require("dotenv").config();

exports.auth = (req, res, next) => {

  try {

    let token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing"
      });
    }

    // Remove "Bearer " prefix if present
    if (token.startsWith("Bearer ")) {
      token = token.slice(7);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();

  } 
  catch (error) {

    return res.status(401).json({
      success: false,
      message: "Invalid token"
    });

  }

};