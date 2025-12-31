import {create} from "zustand"
import { axiosInstance } from "../lib/axios.js"

export const useAuthSotre = create((set)=>({
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,

    isCheckingAuth:true,  //each time we refresh the page it should check whethter the user is authenticate or not

    checkAuth: async ()=>{
        try {
            const res = await axiosInstance.get('/auth/check')
            set({authUser:res.data})
        } catch (error) {
            console.log("error in checkauth",error)
            set({authUser:null})
        }
        finally{
            set({isCheckingAuth:false})
        }
    }
}))