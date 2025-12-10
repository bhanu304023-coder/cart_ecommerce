import React, { useContext, useState, useEffect } from "react";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import { authDataContext } from "../contexts/AuthContext";
import { FiInbox } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import axios from "axios";

const Lists = () => {
  const [list, setList] = useState([]);
  const { server_url } = useContext(authDataContext);

  const fetchList = async () => {
    try {
      const res = await axios.get(`${server_url}/api/product/product_list`);
      const data = res.data;
      data.products = data;
      console.log(data.products);
      setList(data.products || []);
      // toast.success("Product List Loaded");
    } catch (error) {
      console.error(error);
      // toast.error("No List Found!");
    }
  };

  const handleDelete = async (id) => {
    // Ask for confirmation
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return; // Exit if user cancels

    try {
      const res = await axios.post(
        `${server_url}/api/product/delete_product`,
        { id },
        { withCredentials: true }
      );

      if (res.data) {
        toast.success("Product removed successfully.");
        fetchList(); // Refresh the list after deletion
      } 
    } catch (error) {
      toast.error("Error removing product!");
      console.error(error);
    }
  };



  const formatPrice = (num) => {
    let value = new Intl.NumberFormat("en-IN", {
      minimumFractionDigits: 0,
    }).format(num);
    return `₹ ${value}`;
  };


  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="w-screen min-h-screen bg-gradient-to-b from-[#141414] to-[#0c2025] text-white relative overflow-x-hidden">
      
      <Nav />
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="w-[82%] absolute right-0 mt-[70px] px-8 md:px-16 py-10 flex flex-col gap-10">

        {/* PAGE TITLE */}
        <h1 className="text-2xl md:text-3xl font-bold">All Products</h1>

        {/* PRODUCT LIST / EMPTY STATE */}
        {list.length === 0 ? (
          <div className="w-full flex justify-start items-start mt-10">
            <div className="w-[350px] bg-[#1b1b1b] border border-gray-700 rounded-2xl p-10 shadow-lg text-center">
              
              <FiInbox size={50} className="text-gray-500 mx-auto mb-4" />

              <h2 className="text-gray-200 text-xl font-semibold mb-2">
                No Records Found!
              </h2>

              <p className="text-gray-400 text-sm">
                Try adding new products or check back later.
              </p>

            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {list.map((item, i) => (
            <div key={i} className="relative bg-[#1c1c1c] p-3 rounded-xl shadow-md border border-gray-700 transition-all">
              {/* IMAGE */}
              <img src={item.image1} alt={item.name} className="w-full h-[250px] object-cover rounded-lg mb-3"/>
              {/* NAME */}
              <h2 className="text-[14px] md:text-[16px] font-medium">{item.name}</h2>
              {/* CATEGORY */}
              <p className="text-[11px] md:text-[13px] text-gray-400 mt-1">{item.category}</p>
              {/* PRICE */}
              <p className="text-[#8adbea] mt-2 text-[13px] md:text-[15px] font-semibold">{formatPrice(item.price)}</p>
              {/* DELETE ICON */}
              <button onClick={() => handleDelete(item._id)} className="absolute bottom-3 right-3 text-[#8adbea] hover:text-red-500 transition-all">
                <FiTrash2 size={18} />
              </button>
            </div>
          ))}
        </div>
        )}

      </div>
    </div>
  );
};

export default Lists;
