import React from "react";
import { FaCircle } from "react-icons/fa";

const Hero = ({ heroData, heroCount, setHeroCount }) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-10 md:px-20 z-2">

      {/* TEXT SECTION */}
      <div className="text-white">
        <p className="text-2xl md:text-4xl lg:text-6xl font-bold drop-shadow-lg">
          {heroData.text1}
        </p>
        <p className="text-xl md:text-3xl lg:text-5xl mt-2 drop-shadow-lg text-[#88d9ee]">
          {heroData.text2}
        </p>
      </div>

      {/* DOTS */}
      <div className="flex gap-3 mt-6">
        {[0, 1, 2, 3].map((index) => (
          <FaCircle
            key={index}
            onClick={() => setHeroCount(index)}
            size={14}
            className={`
              cursor-pointer 
              transition 
              duration-300 
              hover:scale-125 
              ${heroCount === index ? "text-white" : "text-gray-500"}
            `}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
