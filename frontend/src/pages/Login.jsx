import React, { useState,useContext } from "react";
import Logo from "../assets/logo.png";
import Google from "../assets/googel.png";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { authDataContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth,provider } from "../../utils/Firebase";
import { userDataContext } from "../context/UserContext";

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { server_url } = useContext(authDataContext);
    let {getCurrentUser} = useContext(userDataContext);
    
    const HandleSignIn = async(e) => {
        e.preventDefault();
        try {
            let result = await axios.post(
                `${server_url}/api/auth/login`,
                {email,password},
                {withCredentials:true}
            );
            
            console.log(result.data)
            toast.success("Logged in successfully!");
            await getCurrentUser();
            navigate("/home")
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message);
        }
    }

    const googleLogin = async (e) => {
      try {
        const response = await signInWithPopup(auth, provider);
        console.log(response)

        const user = response.user;
        const name = user.displayName;
        const email = user.email;

        const result = await axios.post(
          `${server_url}/api/auth/google-login`,
          {name,email},
          {withCredentials:true}
        );

        toast.success("Login Successful!");
        await getCurrentUser();
        navigate("/home");

      } catch (error) {
        const message = error?.response?.data?.message || "Google signin failed";
        toast.error(message);
      }
    };
  
    return (
      <div className="w-screen h-screen bg-gradient-to-b from-[#0a0a0a] to-[#0c2025] flex flex-col items-center text-white">
  
        {/* Header */}
        <div onClick={() => navigate("/login")} className="w-full h-20 flex items-center px-8 gap-3 cursor-pointer">
          <img className="w-[45px]" src={Logo} alt="Logo" />
          <h1 className="text-2xl font-semibold tracking-wide">Cart</h1>
        </div>
  
        {/* Title */}
        <div className="mt-4 text-center">
          <h2 className="text-[28px] font-bold">Sign in Your Account</h2>
          <p className="text-[15px] opacity-80 mt-1">
            Welcome to Cart — Place your orders with ease
          </p>
        </div>
  
        {/* Form Card */}
        <div className="mt-8 w-[90%] max-w-[450px] bg-white/10 backdrop-blur-2xl border border-white/20 rounded-xl shadow-xl p-8">
  
          <form className="flex flex-col gap-6 " onSubmit={HandleSignIn}>
  
            {/* Google Button */}
            <div onClick={googleLogin} className="w-full h-[52px] bg-white/15 hover:bg-white/25 transition-all 
              rounded-lg flex items-center justify-center gap-3 cursor-pointer font-medium text-[16px]">
              <img className="rounded-full bg-white p-[2px] w-[26px] h-[26px]" src={Google} alt=""/>
              Sign in with Google
            </div>
  
            {/* Divider */}
            <div className="flex items-center gap-4">
              <span className="flex-1 h-[1px] bg-white/20"></span>
              <span className="text-white/60 text-[14px]">or</span>
              <span className="flex-1 h-[1px] bg-white/20"></span>
            </div>
  
            {/* Inputs */}  
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email Address" className="w-full h-[48px] bg-white/10 border border-white/20 rounded-lg px-4 outline-none focus:border-white/40"/>
  
            {/* Password Input with Show/Hide Icon */}
            <div className="relative w-full">
              <input value={password} onChange={(e) => setPassword(e.target.value)} type={showPassword ? "text" : "password"} placeholder="Password" className="w-full h-[48px] bg-white/10 border border-white/20 rounded-lg px-4 pr-12 outline-none focus:border-white/40"/>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-[22px]" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </div>
            </div>
  
            {/* Submit */}
            <button className="w-full h-[50px] bg-[#2aa38a] hover:bg-[#218a74] transition-all text-white font-semibold rounded-lg">
              Login
            </button>
  
          </form>
        </div>
  
        {/* Footer */}
        <p className="mt-5 text-white/70 text-[14px]">
          You haven't any account?{"  "}
          <span onClick={() => navigate("/signup")} className="text-[#2aa38a] font-semibold cursor-pointer hover:underline">
            New Account
          </span>
        </p>
      </div>
    );
}

export default Login
