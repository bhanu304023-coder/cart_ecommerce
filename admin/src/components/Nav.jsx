import React from "react";
import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";

const Nav = () => {
    const navigate = useNavigate();
    return (
        <div className="w-full h-[75px] bg-white fixed top-0 shadow-md z-10 flex items-center justify-between px-10">
            <div onClick={() => navigate("/")} className="flex items-center gap-3 cursor-pointer select-none">
                <img className="w-[50px]" src={Logo} alt="Logo" />
                <h1 className="text-2xl font-bold text-gray-900 tracking-wide">Cart</h1>
            </div>
            <div className="flex items-center gap-3 cursor-pointer">
                <div className="w-11 h-11 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-all">
                <FiUser size={22} className="text-gray-700" />
                </div>
                <span className="text-gray-800 font-semibold text-lg">Admin</span>
            </div>
        </div>
    );
};

export default Nav;
