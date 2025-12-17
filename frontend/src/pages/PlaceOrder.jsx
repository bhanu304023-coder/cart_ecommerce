import React, { useContext, useState } from "react";
import { shopDataContext } from "../context/ShopContext";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {

    const [paymentMethod, setPaymentMethod] = useState("razorpay");
    const { cartItem,setCartItem, products, updateCart, getCartCount, getCartAmount, currency, delivery_fee } =  useContext(shopDataContext);
    const {server_url}  = useContext(authDataContext);
    const navigate   = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        pinCode: "",
        country: "",
        phone: "",
    });

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData((data) => ({ ...data, [name]: value }));
    };

  

    const onSubmitHandler = async () => {
        try {
            let orderItems = [];
            for (const productId in cartItem) {
                for (const size in cartItem[productId]) {
                    if (cartItem[productId][size] > 0) {
                        const productInfo = structuredClone(products.find((product) => product._id === productId));
                        if (productInfo) {
                            productInfo.size = size;
                            productInfo.quantity = cartItem[productId][size];
                            orderItems.push(productInfo);
                        }
                    }
                }
            }
            const amount = Number(await getCartAmount());
            const finalAmount = amount + Number(delivery_fee);

            const orderData = {
                address: formData,
                items: orderItems,
                amount: finalAmount,
                paymentMethod,
            };

            console.log("ORDER DATA ", orderData);

            switch(paymentMethod){
                case "cod":
                    const result =  await axios.post(`${server_url}/api/order/place_order`,orderData,{withCredentials:true});
                    console.log(result.data);
                    
                    if(result.data){
                        setCartItem({});
                        navigate("/orders");
                    }else{
                        console.log(result.data.message)
                    }
                    break;
                break;
                case "razorpay":
                    
                break;
            }

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="pt-[100px] min-h-screen bg-gradient-to-br from-[#06191f] via-[#0b2a33] to-[#06191f] text-white px-6 md:px-20">
        <h1 className="text-3xl font-bold mb-10">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Delivery Information */}
            <div className="lg:col-span-2 bg-[#0e2a32]/80 backdrop-blur rounded-2xl p-8 shadow-xl">
            <h2 className="text-xl font-semibold mb-6">Delivery Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input className="input" name="firstName" value={formData.firstName} onChange={onChangeHandler} placeholder="First Name" />
                <input className="input" name="lastName" value={formData.lastName} onChange={onChangeHandler} placeholder="Last Name" />
                <input className="input md:col-span-2" name="email" value={formData.email} onChange={onChangeHandler} placeholder="Email Address" />
                <input className="input md:col-span-2" name="street" value={formData.street} onChange={onChangeHandler} placeholder="Street Address" />
                <input className="input" name="city" value={formData.city} onChange={onChangeHandler} placeholder="City" />
                <input className="input" name="state" value={formData.state} onChange={onChangeHandler} placeholder="State" />
                <input className="input" name="pinCode" value={formData.pinCode} onChange={onChangeHandler} placeholder="Pincode" />
                <input className="input" name="country" value={formData.country} onChange={onChangeHandler} placeholder="Country" />
                <input className="input md:col-span-2" name="phone" value={formData.phone} onChange={onChangeHandler} placeholder="Phone Number" />
            </div>
            </div>

            {/* Order Summary */}
            <div className="bg-[#0e2a32]/80 backdrop-blur rounded-2xl p-8 shadow-xl h-fit">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

            <div className="space-y-3 text-gray-300">
                <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹ 3,399</span>
                </div>
                <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>₹ 35</span>
                </div>
                <hr className="border-white/10 my-4" />
                <div className="flex justify-between text-lg font-semibold text-white">
                <span>Total</span>
                <span>₹ 3,434</span>
                </div>
            </div>

            {/* Payment */}
            <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Payment Method</h3>

                <div className="flex flex-col gap-3">

                {/* Razorpay */}
                <button
                    onClick={() => setPaymentMethod("razorpay")}
                    className={`payment-card ${paymentMethod === "razorpay" ? "active" : ""}`}
                >
                    <div className="icon-box">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg"
                        alt="Razorpay"
                        className="h-5"
                    />
                    </div>
                    <span>Pay Online</span>
                </button>

                {/* COD */}
                <button
                    onClick={() => setPaymentMethod("cod")}
                    className={`payment-card ${paymentMethod === "cod" ? "active" : ""}`}
                >
                    <div className="icon-box">💵</div>
                    <span>Cash on Delivery</span>
                </button>

                </div>
            </div>

            <button
                onClick={() => onSubmitHandler()}
                className="mt-8 w-full bg-gradient-to-r from-blue-500 to-blue-700 py-3 rounded-xl font-semibold text-lg hover:opacity-90 transition"
            >
                Place Order
            </button>
            </div>
        </div>

        <style jsx>{`
            .input {
            background: #0b1f26;
            padding: 14px 16px;
            border-radius: 12px;
            border: 1px solid rgba(255,255,255,0.08);
            outline: none;
            color: white;
            }

            .payment-card {
            background: #0b1f26;
            border: 1px solid rgba(255,255,255,0.12);
            padding: 14px 16px;
            border-radius: 14px;
            display: flex;
            align-items: center;
            gap: 14px;
            cursor: pointer;
            }

            .payment-card.active {
            border-color: #3b82f6;
            background: #102a33;
            box-shadow: 0 0 0 1px #3b82f6;
            }

            .icon-box {
            width: 42px;
            height: 42px;
            border-radius: 10px;
            background: #ffff;
            display: flex;
            align-items: center;
            justify-content: center;
            }
        `}</style>
        </div>
    );
};

export default PlaceOrder;
