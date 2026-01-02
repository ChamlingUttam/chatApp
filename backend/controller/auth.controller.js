// import User from "../models/user.model.js";
// import bcrypt from 'bcrypt'
// import { generateToken } from "../utils/utils.js";
// import cloudinary from "../utils/cloudinary.js";


// export const signup = async (req,res)=>{

//     const {fullname,email,password} = req.body;

//     try {
       

//         if(!fullname || !email||!password){
//             return res.status(400).json({message:"please fill the form"})
//         }

//         if(password.length < 8 ){
//             return res.status(400).json({message:"password must be atleast of 8 character"})
//         }

//          const existUser = await User.findOne({email})

//         if(existUser){
//             return res.status(400).json("user already exist")
//         }


//         const salt = await bcrypt.genSalt(10)
//         const hashPassword = await bcrypt.hash(password,salt)


//     const newUser = new User({
//         fullname,
//         email,
//         password:hashPassword
//     })

//     if(newUser){
//         generateToken(newUser._id,res)
//         await newUser.save()

//         res.status(201).json({
//             _id:newUser._id,
//             fullname:newUser.fullname,
//             email:newUser.email,
//             profilePic:newUser.profilePic,
//         })
//     }

//     } catch (error) {
//         console.log({message:error.message})
//     }
// }

// export const login = async (req,res)=>{
    
//     const {email,password} = req.body

//     try {

//         if(!email || !password){
//             return res.status(400).json("please fill the field")
//         }

//         const existUser = await User.findOne({email})

//         if(!existUser){
//             return res.status(400).json("invalid cridential")
//         }

//         const checkPassword = await bcrypt.compare(password,existUser.password)

//         if(!checkPassword){
//             return res.status(400).json("invalid crediential")
//         }
        
    
//         generateToken(existUser._id,res)

//         res.status(200).json({
//             _id : existUser._id,
//             fullname:existUser.fullname,
//             email:existUser.email,
//             profilePic:existUser.profilePic,

//         })

//     } catch (error) {
//         res.status(400).json({message:error.message})
//     }
// }

// export const logout = async (req,res)=>{
//     res.cookie("jwt","",{
//         maxAge:0
//     })

//     res.status(200).json({message:"logout sucessfully"})
// }


// export const updateProfile = async (req,res)=>{

//     const {profilePic} = req.body
// try {
    
//     const userId = req.user._id

//     if(!profilePic){
//         return res.status(400).json("pic is required")
//     }

//     //this only store in cloudinary container not inour database
//     const uploadResponse = await cloudinary.uploader.upload(profilePic)

//     //so this line is code to store in our database
//     const updateUser = await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true})

//     res.status(200).json(updateUser)
// } catch (error) {
//     res.status(500).json({message:error.message})
// }
// }

// export const checkAuth = async (req,res)=>{
//     try {
//         res.status(200).json(req.user)
//     } catch (error) {
//         res.status(500).json({message:error.message})
//     }
// }









import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/utils.js";
import cloudinary from "../utils/cloudinary.js";

// SIGNUP
export const signup = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    // Validation
    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = new User({
      fullname,
      email,
      password: hashPassword,
    });

    // Generate token (login user immediately)
    generateToken(newUser._id, res);
    await newUser.save();

    // Send user data to frontend
    res.status(201).json({
      _id: newUser._id,
      fullname: newUser.fullname,
      email: newUser.email,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const checkPassword = await bcrypt.compare(password, existUser.password);
    if (!checkPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(existUser._id, res);

    res.status(200).json({
      _id: existUser._id,
      fullname: existUser.fullname,
      email: existUser.email,
      profilePic: existUser.profilePic,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGOUT
export const logout = async (req, res) => {
  res.cookie("jwt", "", {
    maxAge: 0,
    httpOnly: true,
  });

  res.status(200).json({ message: "Logout successfully" });
};

// UPDATE PROFILE
export const updateProfile = async (req, res) => {
  const { profilePic } = req.body;

  try {
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile picture is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CHECK AUTH (for page refresh)
export const checkAuth = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
