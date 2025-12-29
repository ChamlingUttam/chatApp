import User from "../models/user.model.js";
import bcrypt from 'bcrypt'
import { generateToken } from "../utils/utils.js";


export const signup = async (req,res)=>{

    const {fullname,email,password} = req.body;

    try {
       

        if(!fullname || !email||!password){
            return res.status(400).json({message:"please fill the form"})
        }

        if(password.length < 8 ){
            return res.status(400).json({message:"password must be atleast of 8 character"})
        }

         const existUser = await User.findOne({email})

        if(existUser){
            return res.status(400).json("user already exist")
        }


        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)


    const newUser = new User({
        fullname,
        email,
        password:hashPassword
    })

    if(newUser){
        generateToken(newUser._id,res)
        await newUser.save()

        res.status(201).json({
            _id:newUser._id,
            fullname:newUser.fullname,
            email:newUser.email,
            profilePic:newUser.profilePic,
        })
    }

    } catch (error) {
        console.log({message:error.message})
    }
}

export const login = async (req,res)=>{
    
}

export const logout = async (req,res)=>{
    
}