import React, { useState } from 'react'
import Nav from '../components/Nav'
import Background from '../components/Background';
import Hero from '../components/Hero';
import { useEffect } from 'react';

const Home = () => {

  let heroData = [
    { text1: "30% OFF Limited Offer", text2: "Style that!" },
    { text1: "Discover the Best of Bold Fashion", text2: "Limited Time Only!" },
    { text1: "Explore Our Best Collection", text2: "Shop Now!" },
    { text1: "Choose Your Perfect Fashion Fit", text2: "Now on Sale!" }
  ];

  let [heroCount, setHeroCount] = useState(0);

  useEffect(() =>{
    let interval  =  setInterval(() => {
        setHeroCount(preCount => (preCount === 3 ? 0 : preCount + 1));
    },3000)
    return () => clearInterval(interval)
  })

  return (
    <div className="w-screen min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#0c2025] text-white">

      <Nav />

      {/* HERO SECTION */}
      <div className="relative w-full h-[90vh] overflow-y-auto overflow-x-hidden top-[75px]">
        <Background heroCount={heroCount} />
        <Hero 
          heroCount={heroCount} 
          setHeroCount={setHeroCount} 
          heroData={heroData[heroCount]} 
        />
      </div>


      {/* ADD YOUR PRODUCT LIST HERE */}
      <div className="px-6 py-10">
        <h1 className="text-3xl font-bold mb-6">Latest Fashion</h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Demo Product Cards */}
          {[1,2,3,4,5,6,7,8].map((item)=>(
            <div key={item} className="bg-[#ffffff12] p-4 rounded-xl shadow-lg">
              <div className="w-full h-40 bg-gray-300 rounded-lg"></div>
              <p className="mt-3 font-semibold">Dress {item}</p>
              <p className="text-sm text-gray-400">₹999</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Home
