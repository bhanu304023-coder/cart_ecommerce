import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-white text-black pt-10 pb-6 px-6 mt-10 border-t border-gray-300">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-semibold mb-3">Your Brand</h2>
          <p className="text-sm text-gray-600">
            Quality products, trusted service, and exclusive offers you’ll love.
          </p>

          <div className="flex mt-4 gap-4 text-xl text-gray-700">
            <FaFacebook className="hover:text-blue-600 cursor-pointer" />
            <FaInstagram className="hover:text-pink-500 cursor-pointer" />
            <FaTwitter className="hover:text-blue-400 cursor-pointer" />
            <FaYoutube className="hover:text-red-600 cursor-pointer" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="hover:text-black cursor-pointer">Home</li>
            <li className="hover:text-black cursor-pointer">Collections</li>
            <li className="hover:text-black cursor-pointer">About Us</li>
            <li className="hover:text-black cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
            <h3 className="text-lg font-semibold mb-3">Contact Us</h3>

            <p className="text-sm text-gray-600">
                Email: support@yourbrand.com
            </p>

            <p className="text-sm text-gray-600">
                Phone: +91 98765 43210
            </p>

            <p className="text-sm text-gray-600 mt-2">
                Address: Visakhapatnam, Andhra Pradesh, India – 
                <span className="font-medium">530017</span>
            </p>
        </div>

      </div>

      {/* Bottom Line */}
      <div className="w-full h-[1px] bg-gray-300 my-6"></div>

      <p className="text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Your Brand — All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
