import React from "react";

const Title = ({ text1, text2 }) => {
  return (
    <div className="relative inline-block mb-6">
        <h2 className="text-[32px] md:text-[42px] font-semibold tracking-wide">
            <span className="text-white">{text1} </span>
            <span className="text-[#88d9ee]">{text2}</span>
        </h2>
        <div className="w-16 h-[4px] bg-[#88d9ee] mx-auto mt-2 rounded-full transition-all duration-300 hover:w-24"></div>
    </div>
  );
};

export default Title;
