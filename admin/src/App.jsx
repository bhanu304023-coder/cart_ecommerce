import React from 'react';
import {Routes,Route} from 'react-router-dom';
import Add from './pages/Add';
import Home from './pages/Home';
import Lists from './pages/Lists';
import Login from './pages/Login';
import Orders from './pages/Orders';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from 'react';
import { adminDataContext } from './contexts/UserContext';


const App = () => {

  const { adminData } = useContext(adminDataContext);

  return (
    <>
      { !adminData ? (
        <Login />
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<Add />} />
            <Route path="/lists" element={<Lists />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </>
      )}

      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default App
