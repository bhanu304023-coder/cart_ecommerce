import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { shopDataContext } from "../context/ShopContext";
import { authDataContext } from "../context/AuthContext";

const Order = () => {
  const [orderData, setOrderData] = useState([]);
  const { currency } = useContext(shopDataContext);
  const { server_url } = useContext(authDataContext);

  const loadOrderData = async () => {
    try {
      const res = await axios.get(
        `${server_url}/api/order/order_list`,
        { withCredentials: true }
      );

      if (res.data) {
        const allOrders = [];

        res.data.forEach(order => {
          order.items.forEach(item => {
            allOrders.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
              orderId: order._id,
            });
          });
        });
        console.log(allOrders)
        setOrderData(allOrders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, []);

  return (
    <div className="pt-[100px] min-h-screen bg-gradient-to-br from-[#06191f] via-[#0b2a33] to-[#06191f] text-white px-6 md:px-20">
      <h1 className="text-3xl font-bold mb-12">My Orders</h1>

      <div className="space-y-8">
        {orderData.map((item, index) => (
          <div
            key={index}
            className="order-card"
          >
            {/* Header */}
            <div className="order-header">
              <div>
                <p className="label">Order ID</p>
                <p className="value">{item.orderId}</p>
              </div>

              <div>
                <p className="label">Placed On</p>
                <p className="value">
                  {new Date(item.date).toDateString()}
                </p>
              </div>

              <span className={`status ${item.status.toLowerCase()}`}>
                {item.status}
              </span>
            </div>

            {/* Item */}
            <div className="order-item">
              <img
                src={item.image1}
                alt={item.name}
                className="item-image"
              />

              <div className="flex-1">
                <h3 className="item-name">{item.name}</h3>
                <p className="item-meta">
                  Size: {item.size} • Qty: {item.quantity}
                </p>
                <p className="item-meta">
                  Payment: {item.paymentMethod}
                </p>
              </div>

              <p className="item-price">
                {currency} {item.price}
              </p>
            </div>

            {/* Footer */}
            <div className="order-footer">
              <button className="btn secondary">View Details</button>
              <button className="btn primary">Track Order</button>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .order-card {
          background: rgba(14, 42, 50, 0.8);
          backdrop-filter: blur(12px);
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

        .status {
          padding: 8px 18px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 500;
        }

        .status.delivered {
          background: rgba(34,197,94,0.15);
          color: #22c55e;
        }

        .status.pending {
          background: rgba(234,179,8,0.15);
          color: #eab308;
        }

        .order-item {
          display: flex;
          gap: 20px;
          align-items: center;
          background: #0b1f26;
          padding: 20px;
          border-radius: 16px;
        }

        .item-image {
          width: 90px;
          height: 90px;
          object-fit: cover;
          border-radius: 14px;
        }

        .item-name {
          font-weight: 600;
          margin-bottom: 4px;
        }

        .item-meta {
          font-size: 14px;
          color: #9ca3af;
        }

        .item-price {
          font-weight: 600;
          font-size: 18px;
        }

        .order-footer {
          display: flex;
          justify-content: flex-end;
          gap: 14px;
          margin-top: 24px;
        }

        .btn {
          padding: 12px 22px;
          border-radius: 14px;
          font-weight: 500;
        }

        .btn.primary {
          background: linear-gradient(to right, #3b82f6, #2563eb);
        }

        .btn.secondary {
          background: #0b1f26;
          border: 1px solid rgba(255,255,255,0.15);
        }
      `}</style>
    </div>
  );
};

export default Order;
