import express from "express";
import { Register, login, logout, googleLogin, AdminLogin,AdminLogout } from "../controllers/authController.js";

const authRoutes = express.Router();

authRoutes.post("/registration", Register);
authRoutes.post("/login", login);
authRoutes.post("/logout", logout);
authRoutes.post("/google-login", googleLogin);
authRoutes.post("/admin-login", AdminLogin);
authRoutes.post("/admin-logout", AdminLogout);


export default authRoutes;