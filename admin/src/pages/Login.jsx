import React, { useState, useContext } from "react";
import Logo from "../assets/logo.png";
import Google from "../assets/googel.png";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "axios";
import { authDataContext } from "../contexts/AuthContext";

const Login = () => {

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { server_url } = useContext(authDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter email & password");
      return;
    }

    try {
      console.log(server_url,'server_url')
      setLoading(true);
      const res = await axios.post(`${server_url}/api/auth/admin-login`, 
        { email, password }, 
        { withCredentials: true}
      );

      console.log(res)

      toast.success("Login Successful");
      localStorage.setItem("admin_token", res.data.token);
      
      setTimeout(() => {
        navigate("/");
        window.location.reload()
      }, 800);

    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Invalid Credentials");
    } finally {
      setLoading(false);
    }

  };


  return (
    <div className="w-screen h-screen bg-gradient-to-b from-[#0a0a0a] to-[#0c2025] flex flex-col items-center text-white">
      
      {/* Header */}
      <div onClick={() => navigate("/")} className="w-full h-20 flex items-center px-8 gap-3 cursor-pointer">
        <img className="w-[45px]" src={Logo} alt="Logo" />
        <h1 className="text-2xl font-semibold tracking-wide">Cart</h1>
      </div>

      {/* Title */}
      <div className="mt-4 text-center">
        <h2 className="text-[28px] font-bold">Sign in your Account</h2>
        <p className="text-[15px] opacity-80 mt-1">
          Welcome to Cart — Apply to Admin Login
        </p>
      </div>

      {/* Form Card */}
      <div className="mt-8 w-[90%] max-w-[450px] bg-white/10 backdrop-blur-2xl border border-white/20 rounded-xl shadow-xl p-8">

        <form className="flex flex-col gap-6" onSubmit={submitHandler}>

          {/* Email Input */}
          <input 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            type="email" 
            placeholder="Email Address"
            className="w-full h-[48px] bg-white/10 border border-white/20 rounded-lg px-4 outline-none focus:border-white/40"
          />

          {/* Password Input */}
          <div className="relative w-full">
            <input 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              type={showPassword ? "text" : "password"} 
              placeholder="Password"
              className="w-full h-[48px] bg-white/10 border border-white/20 rounded-lg px-4 pr-12 outline-none focus:border-white/40"
            />
            <div 
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-[22px]"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </div>
          </div>

          {/* Submit */}
          <button 
            disabled={loading}
            className={`w-full h-[50px] bg-[#2aa38a] hover:bg-[#218a74] transition-all text-white font-semibold rounded-lg ${
              loading && "opacity-50 cursor-not-allowed"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default Login;
