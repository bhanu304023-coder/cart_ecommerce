import express from "express";
import { isAuth } from "../middleware/isAuth.js";
import { getCurrentUser,getCurrentAdmin } from "../controllers/userController.js";
import adminAuth from "../middleware/adminAuth.js";

let userRoutes  =  express.Router();

userRoutes.post("/get_current_user",isAuth,getCurrentUser)
userRoutes.post("/get_current_admin",adminAuth,getCurrentAdmin)

export default userRoutes;