import Message from "../models/message.model.js"
import User from "../models/user.model.js"
import cloudinary from "../utils/cloudinary.js"
import { getReceiverSocketId, io } from "../utils/socket.js"

export const getUserForSidebar = async (req,res)=>{
    try {

        const loggedInUser = req.user._id
        const filteredUsers = await User.find({_id : {$ne:loggedInUser}}).select("-password")

        res.status(200).json(filteredUsers)
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const getMessages = async(req,res)=>{
    try {

        const {id:userToChatId} = req.params

        const myId = req.user._id
        
        const message = await Message.find({
            
            $or:[
                {senderId:myId,receiverId:userToChatId},
                {senderId:userToChatId,receiverId:myId}
                
            ]
        
        })

        res.status(200).json(message)
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const sendMessages = async(req,res)=>{

    try {

        const {image,text} = req.body

        const {id:receiverId} = req.params //one who receiving the message form me or loggedin user
        const senderId = req.user._id //this is my id or logged in user

        let imageUrl

        if(imageUrl)
        {
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse
        }
        
        const newMessage = new Message ({
            text,
            receiverId,
            senderId,
            image:imageUrl,
        })

        await newMessage.save()

        //using socket.io for message to get irt and dont need to refresh everytime

        const receiverSocketId = getReceiverSocketId(receiverId)
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage)

        }

        res.status(201).json(newMessage)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}