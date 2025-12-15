import React, { useContext, useState, useEffect } from "react";
import Logo from "../assets/logo.png";
import { useNavigate, useLocation } from "react-router-dom";
import { IoSearchCircleOutline, IoSearchCircleSharp } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { HiOutlineShoppingCart, HiCollection } from "react-icons/hi";
import { AiFillHome } from "react-icons/ai";
import { IoIosContact } from "react-icons/io";
import { IoMdCart } from "react-icons/io";
import { userDataContext } from "../context/UserContext";
import { authDataContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";
import { shopDataContext } from "../context/ShopContext";

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation(); // For URL → active tab sync

  const { getCurrentUser, userData } = useContext(userDataContext);
  const { server_url } = useContext(authDataContext);

  const {showSearch, setShowSearch,search,setSearch,getCartCount} = useContext(shopDataContext);
  const [showProfile, setShowProfile] = useState(false);

  // Active states
  const [activeDesktop, setActiveDesktop] = useState("Home");
  const [activeMobile, setActiveMobile] = useState("Home");

  const desktopMenu = ["Home", "Collections", "About", "Contact"];

  // Auto-set active tab based on current URL
  useEffect(() => {
    let path = location.pathname.replace("/", ""); // ex: "home"

    if (path === "home" || path === "") {
      setActiveDesktop("Home");
      setActiveMobile("Home");
      return;
    }

    const formatted = path.charAt(0).toUpperCase() + path.slice(1);

    if (desktopMenu.includes(formatted)) {
      setActiveDesktop(formatted);
      setActiveMobile(formatted);
    }
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await axios.post(`${server_url}/api/auth/logout`, {}, { withCredentials: true });
      getCurrentUser();
      toast.success("Successfully Logged out");
    } catch (error) {
      toast.error("Internal Server Error");
    }
  };

  return (
    <div className="w-full h-[75px] bg-white fixed top-0 shadow-md z-10 flex items-center justify-between px-10">

      {/* Logo */}
      <div onClick={() => navigate("/home")} className="flex items-center gap-3 cursor-pointer select-none">
        <img className="w-[50px]" src={Logo} alt="Logo" />
        <h1 className="text-2xl font-bold text-gray-900 tracking-wide">Cart</h1>
      </div>

      {/* Desktop Menu */}
      <ul className="flex items-center gap-10 text-gray-700 font-medium text-[17px] hidden md:flex">
        {desktopMenu.map((item) => (
          <li
            key={item}
            onClick={() => {
              setActiveDesktop(item);
              navigate(item === "Home" ? "/home" : `/${item.toLowerCase()}`);
            }}
            className="relative cursor-pointer px-4 py-1 group transition-all duration-300"
          >
            <span className="relative z-10">{item}</span>

            <span
              className={`absolute inset-0 bg-gray-200 rounded-lg transition-transform duration-300 
                ${activeDesktop === item ? "scale-100" : "scale-0 group-hover:scale-100"}
              `}
            ></span>
          </li>
        ))}
      </ul>

      {/* Icons */}
      <div className="flex items-center gap-6 text-[28px] text-gray-800 relative">

        {/* Search Icon */}
        {!showSearch ? (
          <IoSearchCircleOutline
            onClick={() => {setShowSearch(!showSearch);navigate("/collections")}}
            className="cursor-pointer hover:scale-110 transition duration-200 text-4xl"
          />
        ) : (
          <IoSearchCircleSharp
            onClick={() => setShowSearch(!showSearch)}
            className="cursor-pointer hover:scale-110 transition duration-200 text-4xl"
          />
        )}

        {/* Profile */}
        {!userData && (
          <FaUserCircle
            onClick={() => setShowProfile(!showProfile)}
            className="cursor-pointer hover:scale-110 transition duration-200"
          />
        )}

        {userData && (
          <div
            onClick={() => setShowProfile(!showProfile)}
            className="w-[30px] h-[30px] bg-[#080808] text-white rounded-full flex items-center justify-center cursor-pointer"
          >
            {userData?.name?.slice(0, 1)}
          </div>
        )}

        {/* Cart Icon */}
        <div className="relative hidden md:flex" onClick={() => navigate("/cart")}>
          <HiOutlineShoppingCart className="cursor-pointer hover:scale-110 transition duration-200" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[12px] px-1.5 py-[2px] rounded-full font-semibold">
            {getCartCount()}
          </span>
        </div>
      </div>

      {/* Search Dropdown */}
      {showSearch && (
        <div className="absolute left-0 w-full bg-white/95 backdrop-blur-xl shadow-xl py-6 border-b border-gray-200 top-[75px] z-30">
          <div className="relative w-[65%] max-w-[750px] mx-auto">
            <IoSearchCircleOutline className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 text-4xl" />
            <input
              type="text"
              placeholder="Search products, categories, brands..."
              className="w-full h-16 pl-20 pr-6 rounded-full bg-gray-100 text-gray-900 text-xl shadow-md outline-none"
              onChange={(e) => {setSearch(e.target.value)}}
              value={search}
            />
          </div>
        </div>
      )}

      {/* Profile Dropdown */}
      {showProfile && (
        <div className="absolute right-10 top-[85px] w-[230px] bg-white shadow-xl rounded-2xl border border-gray-200 z-40">
          <ul className="flex flex-col py-3">
            {!userData && (
              <li
                onClick={() => {
                  navigate("/login");
                  setShowProfile(false);
                }}
                className="px-5 py-3 text-gray-700 hover:bg-gray-100 cursor-pointer text-[16px]"
              >
                Login
              </li>
            )}

            <li className="px-5 py-3 text-gray-700 hover:bg-gray-100 cursor-pointer">Orders</li>
            <li className="px-5 py-3 text-gray-700 hover:bg-gray-100 cursor-pointer">About</li>

            {userData && <div className="w-full h-[1px] bg-gray-200 my-1"></div>}

            {userData && (
              <li
                onClick={handleLogout}
                className="px-5 py-3 text-red-600 hover:bg-red-50 cursor-pointer text-[16px] font-semibold"
              >
                Logout
              </li>
            )}
          </ul>
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      <div className="w-full h-[80px] fixed bottom-0 left-0 bg-[#191818] flex items-center justify-between px-6 md:hidden z-50">

        {/* Home */}
        <button
          onClick={() => navigate("/home")}
          className="flex flex-col items-center justify-center gap-1 text-white"
        >
          <AiFillHome className="w-[26px] h-[26px]" />
          <span className="text-[12px]">Home</span>
        </button>

        {/* Collections */}
        <button
          onClick={() => navigate("/collections")}
          className="flex flex-col items-center justify-center gap-1 text-white"
        >
          <HiCollection className="w-[26px] h-[26px]" />
          <span className="text-[12px]">Collections</span>
        </button>

        {/* Contact */}
        <button
          onClick={() => navigate("/contact")}
          className="flex flex-col items-center justify-center gap-1 text-white"
        >
          <IoIosContact className="w-[26px] h-[26px]" />
          <span className="text-[12px]">Contact</span>
        </button>

        {/* Cart */}
        <button
          onClick={() => navigate("/cart")}
          className="relative flex flex-col items-center justify-center gap-1 text-white"
        >
          <IoMdCart className="w-[26px] h-[26px]" />

          {/* Cart Count Badge */}
          <span className="absolute top-0 right-1 bg-red-500 text-white text-[10px] px-1.5 py-[1px] rounded-full font-bold">
            {getCartCount()}
          </span>
          <span className="text-[12px]">Cart</span>
        </button>
      </div>
    </div>
  );
};

export default Nav;
