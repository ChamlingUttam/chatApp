// import {create} from "zustand"
// import { axiosInstance } from "../lib/axios"
// import toast from "react-hot-toast"

// export const useAuthStore = create((set)=>({
//     authUser:null,
//     isSigningUp:false,
//     isLoggingIn:false,
//     isUpdatingProfile:false,

//     isCheckingAuth:true,  //each time we refresh the page it should check whethter the user is authenticate or not

//     checkAuth: async ()=>{
//         try {
//             const res = await axiosInstance.get('/auth/check')
//             set({authUser:res.data})
//         } catch (error) {
//             console.log("error in checkauth",error)
//             set({authUser:null})
//         }
//         finally{
//             set({isCheckingAuth:false})
//         }
//     },

//     signup : async (data)=>{
//         set({isSigningUp : true})
//         try {
//             const res = await axiosInstance.post('auth/signup',data)
//             set({authUser:res.data})
//             toast.success("account created successfully")
//         } catch (error) {
//             toast.error(error.response.data.message)
//         }
//         finally{
//             set({isSigningUp:false})
//         }
//     },

//     logout : async () =>{
//         try {
//             await axiosInstance.post('/auth/logout')
//             set({authUser:null})
//             toast.success("logout sucessfully")
//         } catch (error) {
//             toast.error(error.response.data.message)
//         }
//     }
// }))






import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login : async(data) =>{
    set({isLoggingIn:true})
    try {
      const res = await axiosInstance.post("/auth/login",data)
      set({authUser:res.data})
      toast.success("login sucessfully")
      
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    }finally{
      set({isLoggingIn:false})
    }

  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  },
}));
