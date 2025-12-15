import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { shopDataContext } from '../context/ShopContext';
import { toast } from "react-toastify";
import RealtedProducts from '../components/RealtedProducts';

const ProductDetail = () => {
  let { productId } = useParams();
  let { products, currency, addToCart } = useContext(shopDataContext);
  let [productData, setProductData] = useState(false);

  const [image, setImage] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = async () => {
    try {
      products.forEach((item) => {
        if (item._id === productId) {
          setProductData(item);
          setImage(item.image1);
          setImage1(item.image1);
          setImage2(item.image2);
          setImage3(item.image3);
          setImage4(item.image4);
          setSize(""); // reset size on product change
          return;
        }
      });
    //   toast.success("Detail page loaded successfully.");
    } catch (error) {
      toast.error("Detail Page Loading error");
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId]);

  const indiaFormatter = new Intl.NumberFormat('en-IN');

  return productData ? (
    <div className="w-full bg-[#0c2025] text-white">

        {/* ================= TOP PRODUCT SECTION ================= */}
        <div className="max-w-7xl mx-auto mt-18 px-6 py-10 grid grid-cols-1 lg:grid-cols-[80px_1fr_420px] gap-10">

        {/* THUMBNAILS */}
        <div className="flex lg:flex-col gap-4">
            {[image1, image2, image3, image4].map((img, idx) => (
            <div
                key={idx}
                onClick={() => setImage(img)}
                className="w-16 h-16 md:w-20 md:h-20 border border-gray-600 rounded-md overflow-hidden cursor-pointer hover:border-white transition"
            >
                <img src={img} className="w-full h-full object-cover" />
            </div>
            ))}
        </div>

        {/* MAIN IMAGE */}
        <div className="flex justify-center items-center">
            <div className="w-full h-[420px] md:h-[520px] lg:h-[620px] rounded-xl overflow-hidden shadow-2xl border border-gray-700">
            <img src={image} className="w-full h-full object-cover" />
            </div>
        </div>

        {/* PRODUCT INFO */}
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-3xl font-bold leading-tight">
                    {productData.name}
                </h1>

                <p className="text-2xl font-semibold mt-3">
                    {currency} {indiaFormatter.format(Number(productData.price))}
                </p>

                <p className="text-gray-400 mt-4 text-sm leading-relaxed">
                    {productData.description}
                </p>
            </div>

            {/* SIZE */}
            <div>
            <h4 className="text-sm font-semibold mb-3 uppercase tracking-wide">
                Select Size
            </h4>
            <div className="flex gap-3 flex-wrap">
                {productData.sizes.map((s, idx) => {
                    const cleanSize = s.replace(/[\[\]\"]/g, "");
                    return (
                        <button
                        key={idx}
                        onClick={() => setSize(cleanSize)}
                        className={`px-4 py-2 text-sm font-semibold rounded-md border transition
                            ${
                            size === cleanSize
                                ? "bg-blue-500 text-white border-blue-500"
                                : "border-gray-500 text-gray-300 hover:bg-gray-300 hover:text-black"
                            }`}
                        >
                        {cleanSize}
                        </button>
                    );
                })}
            </div>
            </div>

            {/* CTA BUTTONS */}
            <div className="flex flex-col gap-3 mt-4">
                <button onClick={() => addToCart(productId,size)} className="w-full py-4 bg-gradient-to-b from-gray-200 to-gray-300 text-black font-bold text-lg rounded-md hover:from-gray-300 hover:to-gray-400 transition active:scale-[0.98]">
                    ADD TO CART
                </button>
            </div>

            {/* TRUST INFO */}
            <div className="text-gray-400 text-sm space-y-2 mt-6 border-t border-gray-700 pt-4">
                <p>✔ 100% Original Product</p>
                <p>✔ Cash on Delivery Available</p>
                <p>✔ Easy 7-Day Returns</p>
            </div>

        </div>
        </div>

        {/* ================= DESCRIPTION / REVIEWS ================= */}
        <div className="max-w-7xl mx-auto px-6 pb-20">

        {/* Tabs */}
        <div className="flex gap-8 border-b border-gray-700 mb-6">
            <button className="pb-3 text-blue-500 font-semibold border-b-2 border-blue-500">
            Description
            </button>
            <button className="pb-3 text-gray-400 hover:text-white transition">
            Reviews (110)
            </button>
        </div>

        {/* Description Box */}
        <div className="bg-[#1c2932] border border-gray-700 rounded-lg p-6 text-gray-300 text-sm md:text-base leading-relaxed">
            <p>
            Elevate your everyday style with this premium-quality product,
            crafted using carefully selected materials to ensure lasting comfort
            and durability. Designed for modern lifestyles, it offers a perfect
            balance of style and functionality, making it suitable for both casual
            outings and special occasions. Experience superior fit, timeless
            design, and dependable quality that you can trust every day.
            </p>
        </div>
        <RealtedProducts
            category={productData.category}
            subCategory={productData.subCategory}
            currentProductId={productData._id}
        />
        </div>
    </div>
    ) : (
    <div className="opacity-0"></div>
    );

};

export default ProductDetail;
