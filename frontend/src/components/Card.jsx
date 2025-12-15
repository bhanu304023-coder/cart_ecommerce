import React, { useContext } from "react";
import { shopDataContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";

const Card = ({ name ,img, id, price }) => {

  let {currency} =  useContext(shopDataContext);
  let  navigate  =  useNavigate();

  return (
    <div onClick={() => navigate(`/product_detail/${id}`)} className="
      w-[300px] h-[250px] 
      bg-[#ffffff0a] backdrop-blur-md
      rounded-2xl overflow-hidden 
      shadow-lg 
      hover:shadow-xl 
      hover:scale-[1.03] 
      transition-all duration-300
      cursor-pointer
      group
    ">
      
      {/* IMAGE */}
      <div className="w-full h-[65%] overflow-hidden">
        <img 
          src={img} 
          alt={name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
        />
      </div>

      {/* DETAILS */}
      <div className="p-4 text-white flex flex-col gap-1">
        <p className="text-lg font-semibold truncate">{name}</p>
          <p className="text-[#88d9ee] text-xl font-bold">
            {currency} {new Intl.NumberFormat("en-IN").format(price)} 
          </p>
      </div>
    </div>
  );
};

export default Card;
