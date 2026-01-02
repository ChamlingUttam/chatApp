import React from 'react'
import Navbar from './components/Navbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LogInPage from './pages/LogInPage'
import ProfilePage from './pages/ProfilePage'
import SettingPage from './pages/SettingPage'
import { useAuthStore } from './store/useAuthStore'
import { useEffect } from 'react'
import {Loader} from 'lucide-react'
import {Toaster} from 'react-hot-toast'

const App = () => {

    const {authUser,checkAuth , isCheckingAuth} = useAuthStore()

    useEffect(()=>{
      checkAuth()
    },[checkAuth])

    console.log(authUser)

    if(isCheckingAuth && !authUser)
      return (
    <div className='flex items-center justify-center h-screen'>
      <Loader className="size-10 animate-spin"/>

    </div>
      )

  return (

 <div>
    <Navbar/>

    <Routes>
        {/* <Route path='/' element={authUser ? <HomePage/> : <Navigate to={"/login"}/>}/>
        <Route path='/signup' element={ !authUser ? <SignUpPage/> : <Navigate to={"/"}/>}/>
        <Route path='/login' element={ !authUser ? <LogInPage/> : <Navigate to={"/"}/>}/>
        <Route path='/profile' element={ authUser ? <ProfilePage/> : <Navigate to={"/login"}/>}/>
        <Route path='/setting' element={<SettingPage/>}/> */}




        <Route path='/' element={ <HomePage/>  }/>
        <Route path='/signup' element={  <SignUpPage/> }/>
        <Route path='/login' element={ <LogInPage/> }/>
        <Route path='/profile' element={  <ProfilePage/> }/>
        <Route path='/setting' element={<SettingPage/>}/>


        
    </Routes>

    <Toaster/>
    
 </div>
  )
}

export default App
