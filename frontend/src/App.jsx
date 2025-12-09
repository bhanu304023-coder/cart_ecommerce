import React, { useContext } from 'react'
import { Routes ,Route } from 'react-router-dom'
import Registration from './pages/Registration'
import Login from './pages/Login'
import Home from './pages/Home'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nav from './components/Nav'
import { userDataContext } from './context/UserContext'

const App = () => {

  let {userData}  =  useContext(userDataContext);
  console.log(userData)

  return (
    <>
    {userData && <Nav/>}
      <Routes>
        <Route path ="/" element={<Home />}/>
        <Route path ="/signup" element={<Registration />}/>
        <Route path ="/login" element={<Login />}/>
      </Routes> 


      {/* Global Toast Component */}
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        pauseOnHover
        theme="dark"
      />   
    </>
  )
}

export default App
