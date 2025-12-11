import React, { useState, useEffect } from 'react'
import Nav from '../components/Nav'
import Background from '../components/Background'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import Product from './Product'

const Home = () => {

  const heroData = [
    { text1: "30% OFF Limited Offer", text2: "Style that!" },
    { text1: "Discover the Best of Bold Fashion", text2: "Limited Time Only!" },
    { text1: "Explore Our Best Collection", text2: "Shop Now!" },
    { text1: "Choose Your Perfect Fashion Fit", text2: "Now on Sale!" }
  ];

  const [heroCount, setHeroCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroCount(prev => (prev === heroData.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-screen min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#0c2025] text-white">

      <Nav />

      {/* HERO SECTION */}
      <div className="relative w-full h-[80vh] mt-[75px] flex items-center justify-center">
        <Background heroCount={heroCount} />
        <Hero heroData={heroData[heroCount]} />
      </div>

      {/* PRODUCT SECTIONS */}
      <Product/>

    </div>
  )
}

export default Home
