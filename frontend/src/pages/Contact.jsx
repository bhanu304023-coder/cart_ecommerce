import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="w-full min-h-screen bg-[#081016] text-white pt-28 pb-20 px-6 md:px-20">

      {/* TITLE */}
      <h1 className="text-5xl md:text-6xl font-bold text-center mb-16">
        CONTACT <span className="text-blue-400">US</span>
      </h1>

      {/* MAIN SECTION */}
      <div className="flex flex-col md:flex-row gap-14 items-start">

        {/* LEFT IMAGE */}
        <div className="md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
            alt="Contact"
            className="rounded-xl shadow-xl w-full"
          />
        </div>

        {/* RIGHT INFO BLOCK */}
        <div className="md:w-1/2 flex flex-col gap-6">
          <h2 className="text-3xl font-semibold mb-3">Our Store</h2>

          {/* ADDRESS */}
          <div className="flex items-start gap-4 bg-[#0f1a20] p-5 rounded-xl shadow-lg">
            <FaMapMarkerAlt className="text-blue-400 text-2xl mt-1" />
            <p>MVP Colony, Visakhapatnam, Andhra Pradesh, India – 530017</p>
          </div>

          {/* PHONE */}
          <div className="flex items-center gap-4 bg-[#0f1a20] p-5 rounded-xl shadow-lg">
            <FaPhoneAlt className="text-blue-400 text-2xl" />
            <p>+91-9876543210</p>
          </div>

          {/* EMAIL */}
          <div className="flex items-center gap-4 bg-[#0f1a20] p-5 rounded-xl shadow-lg">
            <FaEnvelope className="text-blue-400 text-2xl" />
            <p>support@yourbrand.com</p>
          </div>

          {/* CAREERS */}
          <div className="mt-6">
            <h3 className="text-2xl font-semibold mb-2">Careers at Cart</h3>
            <p className="text-gray-300 mb-4">
              Learn more about our teams and job openings
            </p>
            <button className="px-6 py-3 bg-blue-500 text-black rounded-lg font-semibold hover:bg-blue-600 transition">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>

      {/* SUBSCRIBE BANNER */}
      <div className="text-center mt-20 bg-[#0f1a20] p-10 rounded-xl">
        <h3 className="text-2xl font-semibold">Subscribe now & get 20% off</h3>
        <p className="text-gray-400 mt-2">
          Enjoy exclusive savings, deals and early access to new collections.
        </p>
      </div>

    </div>
  );
};

export default Contact;
