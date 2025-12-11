import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { authDataContext } from "./AuthContext";

export const shopDataContext = createContext();

const ShopContext = ({ children }) => {

  const [products, setProducts] = useState([]);
  const [search,setSearch] = useState("");
  const [showSearch,setShowSearch] = useState(false);
  const { server_url } = useContext(authDataContext);

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

  useEffect(() => {
    if (server_url) getProducts();
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
    setShowSearch
  };
 
  return (
    <shopDataContext.Provider value={value}>
      {children}
    </shopDataContext.Provider>
  );

};

export default ShopContext;
