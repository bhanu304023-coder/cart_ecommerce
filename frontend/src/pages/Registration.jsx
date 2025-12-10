import React, { useContext, useState } from "react";
import Logo from "../assets/logo.png";
import Google from "../assets/googel.png";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { authDataContext } from "../context/AuthContext";
import { userDataContext } from "../context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import { signInWithPopup } from "firebase/auth";
import { auth,provider } from "../../utils/Firebase";

const Registration = () => {
  const navigate = useNavigate();
  const { server_url } = useContext(authDataContext);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let {getCurrentUser} = useContext(userDataContext);

  const HandleSignup = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(
        `${server_url}/api/auth/registration`,
        { name, email, password },
        { withCredentials: true }
      );

      console.log(result.data);
      toast.success("Registration Successful!");
      await getCurrentUser();
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const googleSignup = async (e) => {
    try {
      const response = await signInWithPopup(auth, provider);
      // console.log(response)

      const user = response.user;
      const name = user.displayName;
      const email = user.email;

      const result = await axios.post(
        `${server_url}/api/auth/google-login`,
        {name,email},
        {withCredentials:true}
      );

      toast.success("Registration Successful!");
      await getCurrentUser();
      navigate("/home");

    } catch (error) {
      const message = error?.response?.data?.message || "Google signup failed";
      toast.error(message);
    }
  };


  return (
    <div className="w-screen h-screen bg-gradient-to-b from-[#0a0a0a] to-[#0c2025] flex flex-col items-center text-white">

      {/* Header */}
      <div 
        onClick={() => navigate("/signup")} 
        className="w-full h-20 flex items-center px-8 gap-3 cursor-pointer"
      >
        <img className="w-[45px]" src={Logo} alt="Logo" />
        <h1 className="text-2xl font-semibold tracking-wide">Cart</h1>
      </div>

      {/* Title */}
      <div className="mt-4 text-center">
        <h2 className="text-[28px] font-bold">Create Your Account</h2>
        <p className="text-[15px] opacity-80 mt-1">
          Welcome to Cart — Place your orders with ease
        </p>
      </div>

      {/* Card */}
      <div className="mt-8 w-[90%] max-w-[450px] bg-white/10 backdrop-blur-2xl border border-white/20 rounded-xl shadow-xl p-8">
        <form className="flex flex-col gap-6" onSubmit={HandleSignup}>

          {/* Google Button */}
          <div onClick={googleSignup} className="w-full h-[52px] bg-white/15 hover:bg-white/25 transition-all 
            rounded-lg flex items-center justify-center gap-3 cursor-pointer font-medium text-[16px]"
          >
            <img
              className="rounded-full bg-white p-[2px] w-[26px] h-[26px]"
              src={Google}
              alt=""
            />
            Sign up with Google
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <span className="flex-1 h-[1px] bg-white/20"></span>
            <span className="text-white/60 text-[14px]">or</span>
            <span className="flex-1 h-[1px] bg-white/20"></span>
          </div>

          {/* Name Input */}
          <input
            type="text"
            placeholder="Name"
            className="w-full h-[48px] bg-white/10 border border-white/20 rounded-lg px-4 
            outline-none focus:border-white/40"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email Address"
            className="w-full h-[48px] bg-white/10 border border-white/20 rounded-lg px-4 
            outline-none focus:border-white/40"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password */}
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full h-[48px] bg-white/10 border border-white/20 rounded-lg px-4 pr-12 
              outline-none focus:border-white/40"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            type="submit"
            className="w-full h-[50px] bg-[#2aa38a] hover:bg-[#218a74] transition-all 
            text-white font-semibold rounded-lg"
          >
            Create Account
          </button>

        </form>
      </div>

      {/* Footer */}
      <p className="mt-5 text-white/70 text-[14px]">
        Already have an account?{" "}
        <span
          onClick={() => navigate("/login")}
          className="text-[#2aa38a] font-semibold cursor-pointer hover:underline"
        >
          Login
        </span>
      </p>

    </div>
  );
};

export default Registration;
