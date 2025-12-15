import React, { useContext } from 'react'
import { Routes ,Route, useLocation, Navigate } from 'react-router-dom'
import Registration from './pages/Registration'
import Login from './pages/Login'
import Home from './pages/Home'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nav from './components/Nav'
import { userDataContext } from './context/UserContext'
import About from './pages/About'
import Collections from './pages/Collections'
import Contact from './pages/Contact'
import Product from './pages/Product'
import ScrollToTop from "./components/ScrollToTop";
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'

const App = () => {

  let {userData}  =  useContext(userDataContext);
  let location  =  useLocation();
  console.log(location)

  return (
    <>
     <ScrollToTop />
     
    {userData && <Nav/>}
      <Routes>

        <Route path ="/login" element = {
          userData ? (<Navigate to={ location.state?.from || "/home" }/>) : (<Login />)
        }/>

        <Route path ="/signup" element= {
          userData ? (<Navigate to={ location.state?.from || "/home" }/>) : (<Registration />)
        }/>

        <Route path ="/home" element={
          userData ? <Home /> : <Navigate to="/login" state={{from : location.pathname}}/>
        }/>
        

        {/* <Route path ="/" element={<Home />}/> */}

        <Route path ="/about" element={
          userData ? <About /> : <Navigate to="/login" state={{from : location.pathname}}/>
        } />
        <Route path ="/collections" element={
          userData ? <Collections /> : <Navigate to="/login" state={{from : location.pathname}}/>
        } />
        <Route path ="/contact" element={
          userData ? <Contact /> : <Navigate to="/login" state={{from : location.pathname}}/>
        } />
        <Route path ="/product" element={
          userData ? <Product /> : <Navigate to="/login" state={{from : location.pathname}}/>
        } />

        <Route path ="/product_detail/:productId" element={
          userData ? <ProductDetail /> : <Navigate to="/login" state={{from : location.pathname}}/>
        } />

        <Route path ="/cart" element={
          userData ? <Cart /> : <Navigate to="/login" state={{from : location.pathname}}/>
        } />
        
        <Route path ="/place_order" element={
          userData ? <PlaceOrder /> : <Navigate to="/login" state={{from : location.pathname}}/>
        } />
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
