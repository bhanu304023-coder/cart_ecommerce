import React, { useContext, useState } from 'react';
import Nav from '../components/Nav';
import Sidebar from '../components/Sidebar';
import upload from '../assets/upload_product.jpeg';
import { authDataContext } from '../contexts/AuthContext';
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const navigate  = useNavigate();
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [price, SetPrice] = useState("");
  const [subCategory, SetSubCategory] = useState("TopWear");
  const [bestSeller, SetBestSeller] = useState(false);
  const [Sizes, SetSizes] = useState([]);

  let {server_url} =  useContext(authDataContext);

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestSeller", bestSeller);
      formData.append("sizes", JSON.stringify(Sizes)); // ✅ serialize array
      formData.append("image1", image1);
      formData.append("image2", image2);
      formData.append("image3", image3);
      formData.append("image4", image4);

      // ✅ Debug: Log FormData contents
      // console.log("FormData Contents:");
      // for (let pair of formData.entries()) {
        // console.log(pair[0], pair[1]);
      // }

      // console.log("FormData Contents:",formData);
      let result = await axios.post(
        `${server_url}/api/product/addProduct`,
        formData,
        { withCredentials: true }
      );

      console.log(result.data);

      if (result.data) {
        setName("");
        setDescription("");
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);
        SetPrice("");
        SetBestSeller(false);
        setCategory("Men");
        SetSubCategory("TopWear");
        SetSizes([]);
      }

      toast.success("Product Added Successfully");
      navigate("/lists")
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };



  const imageStyle =
    "w-[95px] h-[95px] md:w-[110px] md:h-[110px] rounded-lg shadow-md border border-gray-700 hover:border-[#46d1f7] cursor-pointer overflow-hidden";

  return (
    <div className="w-screen min-h-screen bg-gradient-to-b from-[#141414] to-[#0c2025] text-white relative overflow-x-hidden">
      <Nav />
      <Sidebar />

      <div className="w-[82%] absolute right-0 mt-[70px] px-8 md:px-16 py-10 flex flex-col gap-10">

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold">Add Product</h1>

        {/* FORM START */}
        <form onSubmit={handleProductSubmit} className="flex flex-col gap-10">

          {/* 2 Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* LEFT SIDE */}
            <div className="flex flex-col gap-6">
              {/* Upload Images */}
              <div className="flex flex-col gap-2">
                <p className="text-lg font-medium">Upload Images</p>

                <div className="flex flex-wrap gap-4">

                  <label htmlFor="image1" className={imageStyle}>
                    <img src={image1 ? URL.createObjectURL(image1) : upload} className="w-full h-full object-cover"/>
                    <input  type="file" id="image1" name="image1" hidden required onChange={(e) => setImage1(e.target.files[0])}/>
                  </label>

                  <label htmlFor="image2" className={imageStyle}>
                    <img src={image2 ? URL.createObjectURL(image2) : upload} className="w-full h-full object-cover"/>
                    <input type="file" id="image2" name="image2" required hidden onChange={(e) => setImage2(e.target.files[0])}/>
                  </label>

                  <label htmlFor="image3" className={imageStyle}>
                    <img src={image3 ? URL.createObjectURL(image3) : upload} className="w-full h-full object-cover"/>
                    <input type="file" id="image3"  name="image3"  hidden  required onChange={(e) => setImage3(e.target.files[0])}/>
                  </label>

                  <label htmlFor="image4" className={imageStyle}>
                    <img src={image4 ? URL.createObjectURL(image4) : upload} className="w-full h-full object-cover"/>
                    <input type="file"  required  id="image4"  name="image4"  hidden onChange={(e) => setImage4(e.target.files[0])}/>
                  </label>

                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-2">
                <p className="text-lg font-medium">Product Description</p>
                <textarea placeholder="Type here..." className="w-full h-[110px] text-sm p-3 rounded-lg bg-[#1a1a1a] text-white border border-gray-700 focus:border-[#46d1f7] outline-none transition"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  name="description"
                  required
                ></textarea>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex flex-col gap-6">
              {/* Product Name */}
              <div className="flex flex-col gap-2">
                <label className="text-lg font-medium">Product Name</label>
                <input type="text"  placeholder="Type here..."  className="w-[80%] h-[40px] text-sm px-3 rounded-lg bg-[#1a1a1a] text-white border border-gray-700 focus:border-[#46d1f7] outline-none"
                  onChange={(e) => setName(e.target.value)} value={name} name="name" required />
              </div>

              {/* Category */}
              <div className="flex flex-col gap-2">
                <label className="text-lg font-medium">Product Category</label>
                <select
                  className="w-[80%] text-sm bg-[#1a1a1a] px-3 py-2 rounded-lg border border-gray-700 focus:border-[#46d1f7] outline-none"
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                  name="category"
                  required
                >
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Kids">Kids</option>
                </select>
              </div>

              {/* Sub Category */}
              <div className="flex flex-col gap-2">
                <label className="text-lg font-medium">Sub Category</label>
                <select
                  className="w-[80%] text-sm bg-[#1a1a1a] px-3 py-2 rounded-lg border border-gray-700 focus:border-[#46d1f7] outline-none"
                  onChange={(e) => SetSubCategory(e.target.value)}
                  value={subCategory}
                  name="subCategory"
                  required
                >
                  <option value="TopWear">Top Wear</option>
                  <option value="BottomWear">Bottom Wear</option>
                  <option value="WinterWear">Winter Wear</option>
                </select>
              </div>

              {/* Price */}
              <div className="flex flex-col gap-2">
                <label className="text-lg font-medium">Product Price</label>
                <input
                  type="number"
                  placeholder="Enter product cost"
                  className="w-[80%] h-[40px] text-sm px-3 rounded-lg bg-[#1a1a1a] text-white border border-gray-700 focus:border-[#46d1f7] outline-none"
                  onChange={(e) => SetPrice(e.target.value)}
                  value={price}
                  name="price"
                  required
                />
              </div>

              {/* Product Sizes */}
              <div>
                <p className="text-lg font-medium mb-2">Product Size</p>

                <input type="hidden" name="sizes" value={JSON.stringify(Sizes)} />

                <div className="flex gap-2 flex-wrap">

                  {["XS", "S", "M", "L", "XL", "XXL", "XXXL"].map(size => (
                    <div
                      key={size}
                      onClick={() =>
                        SetSizes(prev =>
                          prev.includes(size)
                            ? prev.filter(i => i !== size)
                            : [...prev, size]
                        )
                      }
                      className={`px-3 py-1.5 text-sm rounded-lg border cursor-pointer transition
                        ${Sizes.includes(size)
                          ? "bg-[#46d1f7] text-black border-[#46d1f7]"
                          : "bg-[#1a1a1a] text-white border-gray-700 hover:border-[#46d1f7] hover:bg-[#16272a]"
                        }`}
                    >
                      {size}
                    </div>
                  ))}

                </div>
              </div>

              {/* Best Seller */}
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-[#46d1f7]"
                  checked={bestSeller}
                  onChange={(e) => SetBestSeller(e.target.checked)}
                  name="bestSeller"
                />
                <label className="text-sm">Add to Best Seller</label>
              </div>

            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="mt-6 w-[200px] py-2.5 bg-[#46d1f7] hover:bg-[#34b6d9] text-black text-lg font-semibold rounded-lg transition">
            Submit
          </button>
        </form>
        {/* FORM END */}

      </div>
    </div>
  );
};

export default Add;
