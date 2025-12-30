import mongoose, { Mongoose } from "mongoose";

const messageSchema = new mongoose.Schema({

    senderId:{
        type:Mongoose.Schema.Types.objectId,
        ref:"User",
        requires:true,
    },

    receiverId:{
        type:Mongoose.Schema.Types.objectId,
        ref:"User",
        requires:true,
    },

    text:{
        type:String,
    },

    image:{
        type:String,

    },

},{timestamps:true})

const Message = mongoose.model("Message",messageSchema)

export default Message