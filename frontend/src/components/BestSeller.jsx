import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import { shopDataContext } from "../context/ShopContext";
import Card from "./Card";

const BestSeller = () => {
  let {products} =  useContext(shopDataContext);
  let [bestSeller,setBestSeller]  = useState([]);

  useEffect(() => {
    const onlyBestSellers = products.filter((product) => {
      return product.bestSeller === true;
    });

    const firstFourProducts = onlyBestSellers.slice(0, 4);
    setBestSeller(firstFourProducts);
  }, [products]);  

  return (
    <div>
      <div className="w-[100%] h-[8%] text-center mt-[50px] ">
        <Title text1={"BEST"} text2={"SELLERS"}/>
        <p className="">Tried, Tested, Loved Discover Our All-Time Best Sellers.</p>
      </div>
      <div className="w-[100%] h-[50%] mt-[30px] flex items-center justify-center flex-wrap gap-[50px] ">
        {
          bestSeller.map((item,index) => (
            <Card key={index} name={item.name}  img={item.image1} id={item._id} price={item.price}/>
          ))
        }
      </div>
    </div>
  );
};

export default BestSeller;
