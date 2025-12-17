import express from "express";
import { isAuth } from "../middleware/isAuth.js";
import { adminAllOrders, placeOrder, updateOrderStatus, userOrder } from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";

const orderRoutes =  express.Router();

// for user
orderRoutes.post("/place_order",isAuth,placeOrder)
orderRoutes.get("/order_list",isAuth,userOrder)

//for admin
orderRoutes.get("/admin_order_list",adminAuth,adminAllOrders);
orderRoutes.post("/update_order_status",adminAuth,updateOrderStatus)

export default orderRoutes;