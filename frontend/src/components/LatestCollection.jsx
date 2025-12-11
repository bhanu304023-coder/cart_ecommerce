import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import { shopDataContext } from "../context/ShopContext";
import Card from "./Card";

const LatestCollection = () => {

    let {products} =  useContext(shopDataContext);
    
    let [latestProducts,setLatestProducts]  =  useState([]);

    useEffect(() => {
        setLatestProducts(products.slice(0,8))
    },[products])

    return (
        <>
            <div className="w-full flex flex-col items-center ">
                <Title text1="LATEST" text2="COLLECTIONS" />
                <p className="">Step Into Style - New Collections Dropping this season</p>
            </div>
            <div className="w-[100%] h-[50%] mt-[30px] flex items-center justify-center flex-wrap gap-[50px] ">
                {
                    latestProducts.map((item, index) => (
                    <Card 
                        key={index}
                        name={item.name}
                        img={item.image1} 
                        id={item._id} 
                        price={item.price}
                    />
                    ))
                }
            </div>

        </>
    );
};

export default LatestCollection;
