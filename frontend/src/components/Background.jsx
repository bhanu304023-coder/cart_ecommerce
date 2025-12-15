import React from "react";
import back1 from "../assets/back4.jpeg";
import back2 from "../assets/back2.jpeg";
import back3 from "../assets/back3.jpeg";
import back4 from "../assets/back1.jpeg";

export default function Background({ heroCount }) {
  const images = [back1, back2, back3, back4];

  return (
    <img
      src={images[heroCount]}
      alt="background"
      className="w-full h-full object-cover absolute top-2 left-0 z-0 transition-all duration-700"
    />
  );
}
