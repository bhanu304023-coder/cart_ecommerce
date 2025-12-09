import React, { useContext, useState } from "react";
import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { IoSearchCircleOutline } from "react-icons/io5";
import { IoSearchCircleSharp } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { userDataContext } from "../context/UserContext";
import { authDataContext } from "../context/AuthContext";
import { AiFillHome } from "react-icons/ai";
import { IoIosContact } from "react-icons/io";
import { IoMdCart } from "react-icons/io";
import { HiCollection } from "react-icons/hi";
import { toast } from "react-toastify";
import axios from "axios";

const Nav = () => {

  const navigate = useNavigate();
  const {getCurrentUser,userData} = useContext(userDataContext);
  const [showSearch,setShowSearch]  = useState(false);
  const [showProfile,setShowProfile] = useState(false);
  const { server_url } = useContext(authDataContext);

  const handleLogout = async(e) => {
    try {
        const  logOut   =  await axios.post(`${server_url}/api/auth/logout`,{},{withCredentials:true});
        console.log(logOut.data)
        getCurrentUser();
        toast.success("Successfully Logged out");
    } catch (error) {
        toast.error("Internal Server End");
    }
  }

  return (

    <div className="w-full h-[75px] bg-white fixed top-0 shadow-md z-10 flex items-center justify-between px-10">

        <div onClick={() => navigate("/")}  className="flex items-center gap-3 cursor-pointer select-none">
            <img className="w-[50px]" src={Logo} alt="Logo" />
            <h1 className="text-2xl font-bold text-gray-900 tracking-wide">Cart</h1>
        </div>

        <ul className="flex items-center gap-10 text-gray-700 font-medium text-[17px] hidden md:flex">
            {["Home", "Collections", "About", "Contact"].map((item) => (
            <li key={item} className="relative cursor-pointer px-4 py-1 group transition-all duration-300">
                <span className="relative z-10 group-hover:text-gray-900">{item}</span>
                <span className="absolute inset-0  bg-gray-200 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 " ></span>
            </li>
            ))}
        </ul>

        <div className="flex items-center gap-6 text-[28px] text-gray-800 relative">
            {!showSearch && (
                <IoSearchCircleOutline onClick={() => setShowSearch(prev => !prev)} className="cursor-pointer hover:scale-110 transition duration-200 text-4xl"/>
            )}
            {showSearch && (
                <IoSearchCircleSharp onClick={() => setShowSearch(prev => !prev)} className="cursor-pointer hover:scale-110 transition duration-200 text-4xl"/>
            )}

            {!userData && <FaUserCircle onClick={() => setShowProfile(prev => !prev)}  className="cursor-pointer hover:scale-110 transition duration-200" />}
            {userData && <div onClick={() => setShowProfile(prev => !prev)}  className="w-[30px] h-[30px] bg-[#080808] text-[white] rounded-full flex items-center justify-center">{userData?.name.slice(0,1)}</div>}

            <div className="relative hidden md:flex">
                <HiOutlineShoppingCart className="cursor-pointer hover:scale-110 transition duration-200 group-hover:animate-shake" />
                <span className=" absolute -top-2 -right-2  bg-red-500  text-white text-[12px] px-1.5 py-[2px] rounded-full  font-semibold  "> 3  </span>
            </div>
        </div>

        {/* SEARCH BAR DROPDOWN */}
        {showSearch && (
            <div className=" absolute left-0 w-full  bg-white/95 backdrop-blur-xl  shadow-xl py-6 border-b border-gray-200  animate-slideDown  z-30 top-[75px]">
                <div className="relative w-[65%] max-w-[750px] mx-auto">
                    <IoSearchCircleOutline className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 text-4xl" />
                    <input type="text"  placeholder="Search products, categories, brands..." className="w-full h-16 pl-20 pr-6 rounded-full bg-gray-100 text-gray-900 text-xl shadow-md focus:shadow-lg outline-none focus:ring-2 focus:ring-gray-400 transition-all" />
                    {/* <button onClick={() => setShowSearch(false)} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-2xl">✕</button> */}
                </div>
            </div>
        )}

        {/* PROFILE DROPDOWN */}
        {showProfile && (
            <div className="absolute right-10  top-[85px]  w-[230px]  bg-white shadow-xl rounded-2xl border border-gray-200  animate-fadeIn  z-40   " >
                <ul className="flex flex-col py-3">
                    {!userData && <li onClick={() => {navigate("/login");setShowProfile(false)}} className="px-5 py-3 text-gray-700 hover:bg-gray-100 cursor-pointer text-[16px] rounded-xl transition-all"> Login</li>}
                    <li className="px-5 py-3 text-gray-700 hover:bg-gray-100 cursor-pointer text-[16px] rounded-xl transition-all">Orders</li>
                    <li className="px-5 py-3 text-gray-700 hover:bg-gray-100 cursor-pointer text-[16px] rounded-xl transition-all">About</li>

                    {userData && <div className="w-full h-[1px] bg-gray-200 my-1"></div>}
                    {userData && <li onClick={() => handleLogout()} className="px-5 py-3 text-red-600 hover:bg-red-50 cursor-pointer text-[16px] rounded-xl transition-all font-semibold">Logout </li>}
                </ul>
            </div>
        )}

        <div className="w-[100vw] h-[80px] flex items-center justify-between px-[20px] fixed bottom-0 left-0 bg-[#191818] md:hidden ">
            <button className="text-[white] flex items-center justify-center flex-col gap-[2px]"><AiFillHome className="w-[25px] h-[30px] text-[white] md:hidden"/> Home</button>
            <button className="text-[white] flex items-center justify-center flex-col gap-[2px]"><HiCollection className="w-[25px] h-[30px] text-[white] md:hidden"/> Collections</button>
            <button className="text-[white] flex items-center justify-center flex-col gap-[2px]"><IoIosContact className="w-[25px] h-[30px] text-[white] md:hidden"/> Contact</button>
            <button className="text-[white] flex items-center justify-center flex-col gap-[2px]"><IoMdCart className="w-[25px] h-[30px] text-[white] md:hidden"/> Cart</button>
        </div>
    </div>

  );
};

export default Nav;
