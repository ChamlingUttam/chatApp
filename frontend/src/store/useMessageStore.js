import { axiosInstance } from "../lib/axios";
import { create } from "zustand";
import toast from "react-hot-toast";
import { User } from "lucide-react";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set,get)=>({
    messages:[],
    users:[],
    selectedUser:null,
    isUsersLoading:false,
    isMessageLoading:false,
    //this is for loading the user that we have start chating
    getUser:async()=>{
        set({isUsersLoading:true})

        try {
            const res = await axiosInstance.get('/message/users')
            set({users:res.data})
        } catch (error) {
            toast.error(error.response.data.message || "something went wrong")
        }finally{
            set({isUsersLoading:false})
        }
    },


    getMessages : async(userId)=>{
        try {
            const res = await axiosInstance.get(`/message/${userId}`)
            set({messages:res.data})
            
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            set({isUsersLoading:false})
        }
    },

     sendMessage: async (messageData) => {
         const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  subscribeToMessages : ()=>{

    const {selectedUser} = get()
    if(!selectedUser) return 

    const socket = useAuthStore.getState().socket


    socket.on("newMessage",(newMessage)=>{
        const isMessageSentFromSelectdUser =newMessage.senderId===selectedUser._id
        if(!isMessageSentFromSelectdUser) return 
        
        set({messages:[...get().messages,newMessage]})
    })
  },

 unsubscribeFromMessages : ()=>{
    const socket = useAuthStore.getState().socket
socket.off('newMessage')
 },


    setSelectedUser: (selectedUser) =>set({selectedUser}),

}))