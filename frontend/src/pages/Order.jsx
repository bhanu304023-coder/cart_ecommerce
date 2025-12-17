import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { shopDataContext } from "../context/ShopContext";
import { authDataContext } from "../context/AuthContext";

const statusSteps = [
  "Order Placed",
  "Packing",
  "Shipped",
  "Out For Delivery",
  "Delivered",
];

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [trackOrder, setTrackOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  const { currency } = useContext(shopDataContext);
  const { server_url } = useContext(authDataContext);

  const loadOrderData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${server_url}/api/order/order_list`,
        { withCredentials: true }
      );
      setOrders(res.data || []);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, []);

  const getStepIndex = (status) => statusSteps.indexOf(status);
  const isCancelled = (status) => status === "Cancelled";

  return (
    <div className="pt-[100px] min-h-screen bg-gradient-to-br from-[#06191f] via-[#0b2a33] to-[#06191f] text-white px-6 md:px-20">
      <h1 className="text-3xl font-bold mb-12">My Orders</h1>

      <div className="space-y-10">
        {orders.map((order, index) => (
          <div key={index} className="order-card">

            {/* HEADER */}
            <div className="order-header">
              <div>
                <p className="label">Order Code</p>
                <p className="value">{order.orderCode}</p>
              </div>

              <div>
                <p className="label">Placed On</p>
                <p className="value">
                  {new Date(order.date).toDateString()}
                </p>
              </div>

              <span
                className={`order-status ${
                  order.status === "Cancelled"
                    ? "text-red-400"
                    : "text-green-400"
                }`}
              >
                <span
                  className={`check-circle ${
                    order.status === "Cancelled"
                      ? "bg-red-500"
                      : "bg-green-500"
                  }`}
                >
                  {order.status === "Cancelled" ? "✕" : "✓"}
                </span>
                {order.status}
              </span>
            </div>

            {/* PRODUCTS */}
            <div className="space-y-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="order-item">
                  <img
                    src={item.image1}
                    alt={item.name}
                    className="item-image"
                  />

                  <div className="flex-1">
                    <h3 className="item-name">{item.name}</h3>
                    <p className="item-meta">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="item-price">
                    {currency}{" "}
                    {Number(item.price).toLocaleString("en-IN")}
                  </p>
                </div>
              ))}
            </div>

            {/* FOOTER */}
            <div className="order-footer">
              <button
                disabled={order.status === "Cancelled" || loading}
                className={`btn primary ${
                  order.status === "Cancelled"
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                onClick={async () => {
                  const ok = await loadOrderData();
                  if (ok) setTrackOrder(order);
                }}
              >
                {order.status === "Cancelled"
                  ? "Order Cancelled"
                  : loading
                  ? "Loading..."
                  : "Track Order"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= TRACK ORDER POPUP ================= */}
      {trackOrder && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#0b1f26] w-[90%] max-w-md rounded-2xl p-6 relative">

            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              onClick={() => setTrackOrder(null)}
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold mb-6">Track Your Order</h2>

            {/* CANCELLED */}
            {isCancelled(trackOrder.status) ? (
              <div className="flex flex-col items-center py-10">
                <div className="w-14 h-14 bg-red-500 rounded-full flex items-center justify-center text-2xl mb-4">
                  ✕
                </div>
                <h3 className="text-red-400 font-semibold text-lg mb-2">
                  Order Cancelled
                </h3>
                <p className="text-gray-400 text-sm text-center">
                  This order has been cancelled and will not be processed further.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                {statusSteps.map((step, idx) => {
                  const currentIndex = getStepIndex(trackOrder.status);
                  const isDone = idx <= currentIndex;

                  return (
                    <div key={step} className="flex flex-col items-start">

                      <div className="flex items-center gap-4">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${isDone ? "bg-green-500 text-white" : "bg-gray-600 text-gray-300"} `} >
                          {isDone ? "✓" : idx + 1}
                        </div>

                        <span className={`text-sm ${isDone ? "text-green-400" : "text-gray-400" }`} >
                          {step}
                        </span>
                      </div>

                      {idx !== statusSteps.length - 1 && (
                        <div className="ml-[14px] my-2 flex flex-col items-center">
                          <div className={`w-[2px] h-6 ${idx < currentIndex ? "bg-green-500" : "bg-gray-600" }`}/>
                          <div className={`w-0 h-0 border-l-4 border-r-4 border-t-6 ${ idx < currentIndex ? "border-t-green-500" : "border-t-gray-600" } border-l-transparent border-r-transparent`}/>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= STYLES ================= */}
      <style jsx>{`
        .order-card {
          background: rgba(14, 42, 50, 0.85);
          border-radius: 22px;
          padding: 28px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.35);
        }
        .order-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        .label {
          font-size: 12px;
          color: #9ca3af;
        }
        .value {
          font-weight: 600;
        }
        .order-status {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
        }
        .check-circle {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          color: #fff;
        }
        .order-item {
          display: flex;
          gap: 18px;
          align-items: center;
          background: #0b1f26;
          padding: 18px;
          border-radius: 16px;
        }
        .item-image {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 14px;
        }
        .item-name {
          font-weight: 600;
        }
        .item-meta {
          font-size: 14px;
          color: #9ca3af;
        }
        .item-price {
          font-weight: 600;
          font-size: 16px;
        }
        .order-footer {
          display: flex;
          justify-content: flex-end;
          margin-top: 24px;
        }
        .btn.primary {
          padding: 12px 22px;
          border-radius: 14px;
          background: linear-gradient(to right, #3b82f6, #2563eb);
        }
      `}</style>
    </div>
  );
};

export default Order;
