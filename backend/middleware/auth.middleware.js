// import  jwt  from "jsonwebtoken"
// import User from "../models/user.model.js"

// export const protectRoute = async(req,res,next)=>{

//     try {
//         const token = req.cookies.jwt

//         if(!token){
//             return res.status(401).json("no token provided")
//         }

//         const decode = jwt.verify(token, process.env.JWT_SECRET)

//         if(!decode){
//             return res.status(401).json("invalid token")
//         }

//         const user = await User.findById(decode.userId).select("-password")

//         req.user = user

//         next()
        


        
//     } catch (error) {
//         res.status(500).json({message:error.message})
//     }
// }





import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({
        message: "No token provided"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "User not found"
      });
    }

    req.user = user;
    next();

  } catch (error) {
    res.status(401).json({
      message: "Not authorized"
    });
  }
};
