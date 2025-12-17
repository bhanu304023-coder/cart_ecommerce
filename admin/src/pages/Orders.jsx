import React, { useContext, useState, useEffect } from "react";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import { authDataContext } from "../contexts/AuthContext";
import axios from "axios";

const Orders = () => {

  const [orders,setOrders] = useState([])
  const { server_url } = useContext(authDataContext);

  /* ===============================
     Fetch All Orders (Admin)
  =============================== */
  const fetchAllOrders = async () => {
    try {
      const res = await axios.get(
        `${server_url}/api/order/admin_order_list`,
        { withCredentials: true }
      );
      setOrders(res.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  /* ===============================
     Update Status (UI only)
  =============================== */
  const handleStatusChange = async(orderId, newStatus) => {
    try {
      const result   = await axios.post(`${server_url}/api/order/update_order_status`,{orderId,status : newStatus},{withCredentials:true});
      if(result.data){
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error)
    }
  };

  const formatPrice = (num) =>
    `₹ ${Number(num).toLocaleString("en-IN")}`;

  return (
    <div className="w-screen min-h-screen bg-gradient-to-b from-[#141414] to-[#0c2025] text-white relative overflow-x-hidden">
      <Nav />
      <Sidebar />

      {/* MAIN CONTENT – SAME AS PRODUCT LIST PAGE */}
      <div className="w-[82%] absolute right-0 mt-[70px] px-8 md:px-16 py-10 flex flex-col gap-10">

        <h1 className="text-2xl md:text-3xl font-bold">All Orders</h1>

        {orders.length === 0 ? (
          <p className="text-gray-400">No orders found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-[#1c1c1c] p-5 rounded-2xl shadow-md border border-gray-700 hover:bg-[#222] transition"
              >
                {/* ================= PRODUCTS ================= */}
                <div className="mb-4">
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">
                    Products
                  </p>

                  <div className="space-y-2">
                    {order.items?.map((item, index) => (
                      <div key={index} className="flex items-center gap-3 bg-[#222] border border-gray-700 rounded-lg p-2">
                        {/* Product Image */}
                        <img
                          src={item.image1 || "https://via.placeholder.com/150"}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-md"
                        />

                        {/* Product Name */}
                        <p className="text-sm text-gray-200 font-medium truncate">
                          {item.name}
                        </p>

                        <span className="text-xs font-semibold text-gray-400">
                          × {item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ================= ORDER INFO ================= */}
                <div className="grid grid-cols-2 gap-4 text-sm mb-5">
                  <div>
                    <p className="text-xs text-gray-400">Order Code</p>
                    <p className="font-semibold">{order.orderCode}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">Date</p>
                    <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">Amount</p>
                    <p className="text-[#8adbea] font-semibold">
                      {formatPrice(order.amount)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">Payment</p>
                    <span className="inline-block bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-semibold">
                      {order.paymentMethod}
                    </span>
                  </div>
                </div>

                {/* ================= CUSTOMER ================= */}
                <div className="mb-5">
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">
                    Customer
                  </p>

                  <p className="text-sm font-medium">
                    {order.address?.firstName} {order.address?.lastName}
                  </p>

                  <p className="text-xs text-gray-400">
                    {order.address?.phone}
                  </p>

                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                    {order.address?.street}, {order.address?.city},{" "}
                    {order.address?.state} – {order.address?.pinCode}
                  </p>
                </div>

                {/* ================= STATUS ================= */}
                <div className="pt-4 border-t border-gray-700/40 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wide text-gray-400">
                    Order Status
                  </span>

                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className="bg-[#2b2b2b] border border-gray-600 text-white text-sm rounded-lg px-4 py-2 focus:outline-none"
                  >
                    <option>Order Placed</option>
                    <option>Packing</option>
                    <option>Shipped</option>
                    <option>Out For Delivery</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
