import express from "express";
import { isAuth } from "../middleware/isAuth.js";
import { placeOrder, userOrder } from "../controllers/orderController.js";

const orderRoutes =  express.Router();

orderRoutes.post("/place_order",isAuth,placeOrder)
orderRoutes.get("/order_list",isAuth,userOrder)

export default orderRoutes;