import mongoose from "mongoose";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";

/* ================================
   Counter Schema (INLINE)
================================ */
const counterSchema = new mongoose.Schema({
    key: { type: String, unique: true },
    seq: { type: Number, default: 0 }
});

const Counter = mongoose.models.Counter || mongoose.model("Counter", counterSchema);

/* ================================
   Generate Unique Order Code
   CART/2025/DEC/0001
================================ */
const generateOrderCode = async () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = now.toLocaleString("en-US", { month: "short" }).toUpperCase();

  const key = `ORDER_${year}_${month}`;

  const counter = await Counter.findOneAndUpdate(
    { key },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  const sequence = counter.seq.toString().padStart(4, "0");

  return `CART/${year}/${month}/${sequence}`;
};


/* ================================
   Place Order Controller
================================ */
export const placeOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.userId;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart items are required" });
    }

    if (!address) {
      return res.status(400).json({ message: "Address is required" });
    }

    const orderCode = await generateOrderCode();

    const orderData = {
      orderCode,
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      status: "Order Placed",
      date: Date.now(),
    };

    const newOrder = new Order(orderData);
    await newOrder.save();

    await User.findByIdAndUpdate(userId, { cartData: {} });

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

/* ================================
   Get User Orders
================================ */
export const userOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    return res.status(200).json(orders).sort({ createdAt: -1 });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};


/* ================================
   Get Admin Orders
================================ */
export const adminAllOrders = async(req,res) => {
  try {
    const orders   = await Order.find({}).sort({ createdAt: -1 });
    res.status(200).json(orders).sort({ createdAt: -1 })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message : "Internal Server Error !",
      error
    })        
  }
}

/* ================================
  Update the OrderStatus 
================================ */
export const updateOrderStatus  =  async(req,res) => {
  try {
    const {orderId, status} = req.body;
    await Order.findByIdAndUpdate(orderId,{status});
    return res.status(201).json({
      message : "Successfully Updated Status"
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message : "Internal Server Error!",
      error
    })
  }
}