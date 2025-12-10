import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiPlusCircle, FiList, FiShoppingBag, FiLogOut } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";
import { authDataContext } from "../contexts/AuthContext";
import { adminDataContext } from "../contexts/UserContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { server_url } = useContext(authDataContext);
  const { getAdmin } = useContext(adminDataContext);

  const handleLogout = async () => {
    try {
      await axios.post(`${server_url}/api/auth/admin-logout`, {}, { withCredentials: true });
      getAdmin();
      toast.success("Successfully logged out");
      navigate("/login");
    } catch (error) {
      toast.error("Logout Error!");
    }
  };

  // Utility: Add active class
  const isActive = (path) =>  location.pathname === path  ? "bg-[#1b1b1b] text-[#8adbea] font-semibold" : "text-gray-300";

  return (
    <div
      className=" fixed left-0 top-0 h-screen w-[60px] md:w-[18%]  bg-[#0b0b0b] border-r border-gray-800 text-white pt-[100px] flex flex-col" >
      <div className="flex flex-col gap-2 px-2 md:px-8">

        {/* Add Items */}
        <div onClick={() => navigate("/add")} className={`flex items-center gap-3 py-3 px-2 md:px-4 rounded-lg cursor-pointer transition-all select-none hover:bg-[#1b1b1b] hover:text-[#8adbea] ${isActive("/add")}`}>
          <FiPlusCircle size={22} />
          <p className="hidden md:inline">Add Items</p>
        </div>

        {/* List Items */}
        <div onClick={() => navigate("/lists")} className={`flex items-center gap-3 py-3 px-2 md:px-4 rounded-lg cursor-pointer transition-all select-none hover:bg-[#1b1b1b] hover:text-[#8adbea] ${isActive("/lists")}`}>
          <FiList size={22} />
          <p className="hidden md:inline">List Items</p>
        </div>

        {/* View Orders */}
        <div onClick={() => navigate("/orders")} className={`flex items-center gap-3 py-3 px-2 md:px-4 rounded-lg cursor-pointer transition-all select-none hover:bg-[#1b1b1b] hover:text-[#8adbea] ${isActive("/orders")}`}>
          <FiShoppingBag size={22} />
          <p className="hidden md:inline">View Orders</p>
        </div>

        {/* Logout */}
        <div onClick={handleLogout} className="flex items-center gap-3 py-3 px-2 md:px-4 mt-6 rounded-lg cursor-pointer transition-all select-none text-red-400 hover:bg-[#1b1b1b] hover:text-red-300">
          <FiLogOut size={22} />
          <p className="hidden md:inline">Logout</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
