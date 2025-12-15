import Order from "../models/orderModel.js";
import User from "../models/userModel.js";

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

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
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
