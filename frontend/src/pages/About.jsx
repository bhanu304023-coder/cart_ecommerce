import React from "react";
import { FaBolt, FaStar, FaUsers, FaHandsHelping } from "react-icons/fa";
import MainImage from "../assets/e-commerce-high-quality-4k-ultra-hd-hdr-free-photo.jpg";

const About = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#0c2025] text-white pt-28 pb-20">

      {/* HERO SECTION */}
      <div className="text-center w-full px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          About <span className="text-blue-400">Our Store</span>
        </h1>

        <p className="text-gray-300 text-base md:text-xl leading-relaxed max-w-[1100px] mx-auto">
          We are an online store dedicated to bringing you the best products,
          curated for quality, value, and convenience. Shop with confidence
          and enjoy seamless online shopping every time.
        </p>
      </div>

      {/* IMAGE + MISSION/WHY CHOOSE US SECTION */}
      <div className="w-full mt-16 flex flex-col md:flex-row items-center px-8 gap-12">
        
        {/* Image Side */}
        <div className="md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f"
            alt="Shopping"
            className="w-full h-[350px] md:h-[450px] object-cover rounded-xl shadow-xl"
          />
        </div>

        {/* Text Side */}
        <div className="md:w-1/2 flex flex-col gap-8">
          <div>
            <h2 className="text-4xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Our mission is to make online shopping effortless and enjoyable.
              We focus on providing high-quality products at competitive prices,
              fast delivery, and a secure shopping experience for all customers.
            </p>
          </div>

          <div>
            <h2 className="text-4xl font-semibold mb-4">Why Shop With Us?</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              We carefully select products from trusted brands and suppliers.
              Our user-friendly platform, responsive customer support, and
              hassle-free returns make us the preferred choice for online shoppers.
            </p>
          </div>
        </div>
      </div>

      {/* STATS SECTION */}
      <div className="w-full mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 px-6">
        {[
          { icon: <FaStar />, value: "4.9/5", label: "Customer Rating" },
          { icon: <FaUsers />, value: "100K+", label: "Happy Shoppers" },
          { icon: <FaBolt />, value: "2000+", label: "Products Available" },
          { icon: <FaHandsHelping />, value: "24/7", label: "Support" }
        ].map((item, i) => (
          <div
            key={i}
            className="bg-[#151515] p-6 rounded-xl text-center shadow-xl hover:scale-105 transition"
          >
            <div className="text-4xl text-blue-300 mb-3">{item.icon}</div>
            <h3 className="text-3xl font-bold">{item.value}</h3>
            <p className="text-gray-400 mt-1 text-base">{item.label}</p>
          </div>
        ))}
      </div>

      {/* STORY SECTION */}
      <div className="w-full mt-24 flex flex-col md:flex-row items-center px-8 gap-12">
        
        {/* Story Image */}
        <div className="md:w-1/2">
          <img
            src={MainImage}
            alt="Our Story"
            className="w-full h-[350px] md:h-[450px] object-cover rounded-xl shadow-xl"
          />
        </div>

        {/* Story Text */}
        <div className="md:w-1/2">
          <h2 className="text-4xl font-semibold mb-5">Our Story</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            We started with a vision to simplify online shopping and bring the best
            products to every home. Over the years, we have grown into a trusted
            ecommerce platform serving thousands of happy customers.
            <br /><br />
            Every product is chosen with care, ensuring you get quality, value,
            and a seamless shopping experience.
          </p>
        </div>
      </div>

    </div>
  );
};

export default About;
