import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { authDataContext } from "./AuthContext";
import { userDataContext } from "./UserContext";

export const shopDataContext = createContext();

const ShopContext = ({ children }) => {

  const [products, setProducts]     =   useState([]);
  const [search,setSearch]          =   useState("");
  const [cartItem,setCartItem]      =   useState({});
  const [showSearch,setShowSearch]  =   useState(false);
  const {server_url}                =   useContext(authDataContext);
  const {userData}                  =   useContext(userDataContext);

  const currency = "₹";
  const delivery_fee = "35";

  const getProducts = async () => {
    try {
      const res = await axios.get(`${server_url}/api/product/product_list`);
      const items = res.data.products || res.data || [];
      
      setProducts(items);

    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  const addToCart = async(productId,size) => {
    try {
        if(!size){
          alert("Please select the size..");
          return;
        }

        let cartData  =  structuredClone(cartItem);
        if(cartData[productId]){
          if(cartData[productId][size]){
            cartData[productId][size] += 1;
          }else {
            cartData[productId][size] = 1;
          }
        }else{
          cartData[productId] = {};
          cartData[productId][size] = 1;
        }

        setCartItem(cartData);

        if(userData){
          try {
            let result = await axios.post(`${server_url}/api/cart/add_cart`,
              {productId,size},
              {withCredentials:true}
            );
            console.log(result.data)
          } catch (error) {
            console.log(error)
          }
        }
        // console.log(cartData)
      } catch (error) {
        console.log("Error To Add to Cart!!!!")
    }
  }

  const updateCart  =  async(productId,size,quantity) => {
    try {
      let cartData  =  structuredClone(cartItem);
      cartData[productId][size] = quantity;
      setCartItem(cartData)

      if(userData){
        try {
          let result = await axios.post(`${server_url}/api/cart/updateCart`,
            {productId,size,quantity},
            {withCredentials:true}
          );
          console.log(result.data)
        } catch (error) {
          console.log(error)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getUserCart  = async() => {
      try {
        let result = await axios.post(`${server_url}/api/cart/get_cart`,
          {},
          {withCredentials:true}
        );
        console.log(result)
        setCartItem(result.data.cartData)
      } catch (error) {
        console.log(error)
      }
  }

  const getCartCount = () => {
    let totalCount = 0;
    for (const productId in cartItem) {
      for (const size in cartItem[productId]) {
        try {
          const count = cartItem[productId][size];
          if (count > 0) {
            totalCount += count;
          }
        } catch (error) {
          console.error("Error reading cartItem:", error);
        }
      }
    }
    return totalCount;
  };

  const getCartAmount = async () => {
    let totalAmount = 0;

    for (const productId in cartItem) {
      const itemInfo = products.find((product) => product._id === productId);

      if (!itemInfo) continue; 

      for (const size in cartItem[productId]) {
        const count = cartItem[productId][size];
        if (count > 0) {
          totalAmount += itemInfo.price * count;
        }
      }
    }
    // console.log(totalAmount)
    return totalAmount;
  };


  useEffect(() => {
    getUserCart();
  }, []);

  useEffect(() => {
    if (server_url) {
      getProducts();
    }
  }, [server_url]);

  

  const value = {
    products,
    setProducts,
    currency,
    delivery_fee,
    getProducts,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItem,
    addToCart,
    getCartCount,
    setCartItem,
    updateCart,
    getCartAmount
  };
 
  return (
    <shopDataContext.Provider value={value}>
      {children}
    </shopDataContext.Provider>
  );

};

export default ShopContext;
