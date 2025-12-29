import mongoose from "mongoose";

export const dbConnnect = async ()=>{
try {
    await mongoose.connect(process.env.MONGO_URI)
     console.log("db connected sucessfully")
} catch (error) {
    console.log({message:error.message})
}
}

