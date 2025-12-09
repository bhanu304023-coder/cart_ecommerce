import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiPlusCircle,FiList,FiShoppingBag,FiLogOut} from "react-icons/fi";
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

    return (
        <div className="w-[18%] min-h-screen bg-[#0b0b0b] border-r border-gray-800 fixed left-0 top-0 pt-[100px] text-white">
            <div className="flex flex-col gap-2 pl-8">
                <div onClick={() => navigate("/add")} className="flex items-center gap-3 text-[16px] py-3 px-4 rounded-lg cursor-pointer select-none transition-all duration-200 text-gray-300 hover:bg-[#1b1b1b] hover:text-[#8adbea]">
                    <FiPlusCircle size={20} />
                    <p>Add Items</p>
                </div>
                    <div onClick={() => navigate("/lists")} className="flex items-center gap-3 text-[16px] py-3 px-4 rounded-lg cursor-pointer select-none transition-all duration-200 text-gray-300 hover:bg-[#1b1b1b] hover:text-[#8adbea]">
                    <FiList size={20} />
                    <p>List Items</p>
                </div>
                <div onClick={() => navigate("/orders")} className="flex items-center gap-3 text-[16px] py-3 px-4 rounded-lg cursor-pointer select-none transition-all duration-200 text-gray-300 hover:bg-[#1b1b1b] hover:text-[#8adbea]">
                    <FiShoppingBag size={20}/>
                    <p>View Orders</p>
                </div>
                <div onClick={() => handleLogout()} className="flex items-center gap-3 text-[16px] py-3 px-4 rounded-lg mt-6 cursor-pointer select-none transition-all duration-200 text-red-400 hover:bg-[#1b1b1b] hover:text-red-300">
                    <FiLogOut size={20}/>
                    <p>Logout</p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
