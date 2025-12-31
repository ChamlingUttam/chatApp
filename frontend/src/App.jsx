import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SingUpPage from './pages/SingUpPage'
import LogInPage from './pages/LogInPage'
import ProfilePage from './pages/ProfilePage'
import SettingPage from './pages/SettingPage'
import { useAuthSotre } from './store/useAuthStore'
import { useEffect } from 'react'

const App = () => {

    const {authUser,checkAuth} = useAuthSotre()

    useEffect(()=>{
      checkAuth()
    },[checkAuth])

    console.log(authUser)

  return (

 <div>
    <Navbar/>

    <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/signup' element={<SingUpPage/>}/>
        <Route path='/login' element={<LogInPage/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
        <Route path='/setting' element={<SettingPage/>}/>
        
    </Routes>
 </div>
  )
}

export default App
