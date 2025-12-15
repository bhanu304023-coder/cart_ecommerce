import express from "express";
import { isAuth } from "../middleware/isAuth.js";
import { addToCart, getUserCart, updateCart } from "../controllers/cartController.js";


const cartRoutes  =  express.Router();

cartRoutes.post("/get_cart",isAuth,getUserCart)
cartRoutes.post("/add_cart",isAuth,addToCart)
cartRoutes.post("/updateCart",isAuth,updateCart)

export default cartRoutes;