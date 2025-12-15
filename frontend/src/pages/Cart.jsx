import React, { useContext, useEffect, useState } from "react";
import { shopDataContext } from "../context/ShopContext";
import { HiOutlineTrash } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItem, products, updateCart, getCartCount, getCartAmount, currency, delivery_fee } =
    useContext(shopDataContext);

    let naivgate =  useNavigate();
    const [totalItems, setTotalItems] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);

  const indiaFormatter = new Intl.NumberFormat("en-IN");

  useEffect(() => {
    setTotalItems(getCartCount());

    const fetchTotalAmount = async () => {
      const amount = await getCartAmount();
      setTotalAmount(amount);
    };
    fetchTotalAmount();
  }, [cartItem]);

  const handleQuantityChange = (productId, size, delta) => {
    const currentQty = cartItem[productId][size] || 0;
    const newQty = Math.max(currentQty + delta, 0);
    updateCart(productId, size, newQty);
  };

  const handleRemoveItem = (productId, size) => {
    updateCart(productId, size, 0);
  };

  if (totalItems === 0) {
    return (
      <div className="pt-[100px] flex flex-col items-center justify-center min-h-[80vh] text-gray-400 bg-[#0c2025]">
        <h1 className="text-3xl font-bold mb-4 text-white">Your Cart is Empty</h1>
        <p className="text-gray-400">Add some products to your cart to see them here.</p>
      </div>
    );
  }

  return (
    <div className="pt-[100px] bg-[#0c2025] min-h-screen text-white px-6 md:px-20">
      <h1 className="text-3xl font-bold mb-6 text-white">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1 space-y-6">
          {Object.keys(cartItem).map((productId) => {
            const product = products.find((p) => p._id === productId);
            if (!product) return null;

            return Object.keys(cartItem[productId]).map((size) => {
              const quantity = cartItem[productId][size];
              if (quantity <= 0) return null;

              return (
                <div
                  key={productId + size}
                  className="flex flex-col md:flex-row items-center justify-between bg-[#1c2932] p-4 rounded-xl shadow-lg border border-gray-700"
                >
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <img
                      src={product.image1 || "/placeholder.png"}
                      alt={product.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex flex-col gap-1">
                      <h2 className="text-lg font-semibold text-white">{product.name}</h2>
                      <p className="text-gray-400 text-sm">Size: {size}</p>
                      <p className="font-bold text-white mt-1">
                        {currency} {indiaFormatter.format(product.price)}
                      </p>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 mt-4 md:mt-0">
                    <button
                      onClick={() => handleQuantityChange(productId, size, -1)}
                      className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white hover:bg-gray-600 transition"
                    >
                      -
                    </button>
                    <span className="w-6 text-center">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(productId, size, 1)}
                      className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white hover:bg-gray-600 transition"
                    >
                      +
                    </button>

                    <button
                      onClick={() => handleRemoveItem(productId, size)}
                      className="text-red-500 hover:text-red-600 transition"
                    >
                      <HiOutlineTrash size={20} />
                    </button>
                  </div>
                </div>
              );
            });
          })}
        </div>

        {/* Cart Summary */}
        <div className="w-full lg:w-93 bg-[#1c2932] p-6 rounded-xl shadow-lg border border-gray-700 flex flex-col gap-4">
            <h2 className="text-xl font-bold text-white">Summary</h2>

            <div className="w-full lg:w-80 bg-[#1c2932] p-6 rounded-xl shadow-lg border border-gray-700 flex flex-col gap-4">
                {/* Summary Details */}
                <div className="flex justify-between text-gray-300">
                    <span>Total Items:</span>
                    <span>{totalItems}</span>
                </div>

                <div className="flex justify-between text-gray-300">
                    <span>Sub Total:</span>
                    <span>{currency} {indiaFormatter.format(totalAmount)}</span>
                </div>

                <div className="flex justify-between text-gray-300">
                    <span>Delivery Fee:</span>
                    <span>{currency} {indiaFormatter.format(delivery_fee)}</span>
                </div>

                <div className="my-2 border-t border-gray-500"></div>

                <div className="flex justify-between font-bold text-white text-lg">
                    <span>Total Amount:</span>
                    <span>{currency} {indiaFormatter.format(totalAmount + Number(delivery_fee))}</span>
                </div>

                    {/* Checkout button - visible on desktop and mobile */}
                    <button onClick={() => naivgate("/place_order")} className="w-full py-3 bg-gradient-to-b from-blue-500 to-blue-600 text-black font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition mt-4">
                        Proceed to Checkout
                    </button>
                </div>

                {/* Sticky button for mobile, visible only on mobile below the bottom nav */}
                <div className="fixed bottom-16 left-0 w-full px-6 lg:hidden z-40">
                    <button onClick={() => naivgate("/place_order")} className="w-full py-3 bg-gradient-to-b from-blue-500 to-blue-600 text-black font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition">
                        Proceed to Checkout
                    </button>
                </div>
            </div>
      </div>
    </div>
  );
};

export default Cart;
