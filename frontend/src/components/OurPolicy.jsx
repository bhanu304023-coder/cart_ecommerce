import React from "react";
import Title from "./Title";
import { FaExchangeAlt, FaUndo, FaHeadset } from "react-icons/fa";

const OurPolicy = () => {
  return (
    <div className="w-full min-h-[60vh] md:min-h-[50vh] flex flex-col items-center bg-gradient-to-b from-[#141414] to-[#141414] py-14 md:py-20 px-4">

      {/* Title Section */}
      <div className="text-center mb-10">
        <Title text1="OUR" text2="POLICY" />
        <p className="max-w-[700px] mx-auto text-[14px] md:text-[20px] text-blue-100 mt-3">
          Customer-Friendly Policies — Committed to your Satisfaction and Safety
        </p>
      </div>

      {/* Policy Cards */}
      <div className="w-full flex items-center justify-center flex-wrap gap-10 lg:gap-16">

        {/* Card 1 */}
        <div className="w-[300px] bg-[#1a1a1a] rounded-2xl p-6 flex flex-col items-center text-center shadow-lg hover:scale-105 duration-300">
          <FaExchangeAlt size={40} className="text-blue-200 mb-3" />
          <p className="text-[18px] font-semibold text-white">Easy Exchange Policy</p>
          <p className="text-[14px] text-gray-300 mt-2">
            Exchange made simple — quick and customer-friendly.
          </p>
        </div>

        {/* Card 2 */}
        <div className="w-[300px] bg-[#1a1a1a] rounded-2xl p-6 flex flex-col items-center text-center shadow-lg hover:scale-105 duration-300">
          <FaUndo size={40} className="text-blue-200 mb-3" />
          <p className="text-[18px] font-semibold text-white">7 Days Return Policy</p>
          <p className="text-[14px] text-gray-300 mt-2">
            Shop with confidence — 7 days return guarantee.
          </p>
        </div>

        {/* Card 3 */}
        <div className="w-[300px] bg-[#1a1a1a] rounded-2xl p-6 flex flex-col items-center text-center shadow-lg hover:scale-105 duration-300">
          <FaHeadset size={40} className="text-blue-200 mb-3" />
          <p className="text-[18px] font-semibold text-white">Best Customer Support</p>
          <p className="text-[14px] text-gray-300 mt-2">
            Reliable support — your satisfaction is our priority.
          </p>
        </div>

      </div>
    </div>
  );
};

export default OurPolicy;
