import React, { useContext, useState, useEffect } from "react";
import { shopDataContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";

const Collections = () => {
  const { products,search,showSearch } = useContext(shopDataContext);
  const {currency}  =  useContext(shopDataContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products || []);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [sortType, setSortType] = useState("relevance");
  const navigate  =  useNavigate();


  useEffect(() => {
    applyFilter();
  }, [selectedCategories, selectedSubCategories, sortType, products,search,showSearch]);

  
  const handleCategoryChange = (category) => {
    let updatedCategories = [...selectedCategories];
    console.log(updatedCategories)
    if (updatedCategories.includes(category)) {
      const index = updatedCategories.indexOf(category);
      updatedCategories.splice(index, 1);
    } else {
      updatedCategories.push(category);
    }
    setSelectedCategories(updatedCategories);
  }

  const handleSubCategoryChange = (sub) =>  {
    let updatedSubCategories = [...selectedSubCategories];
    if (updatedSubCategories.includes(sub)) {
      const index = updatedSubCategories.indexOf(sub);
      updatedSubCategories.splice(index, 1);
    } else {
      updatedSubCategories.push(sub);
    }
    setSelectedSubCategories(updatedSubCategories);
  }

  const handleSortChange = (e) => {
    setSortType(e.target.value);
  };

  const applyFilter = () => {
    let updated = [...products];

    if(showSearch && search){
      updated  =  updated.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (selectedCategories.length > 0) {
      updated = updated.filter((p) => selectedCategories.includes(p.category));
    }
    if (selectedSubCategories.length > 0) {
      updated = updated.filter((p) =>
        selectedSubCategories.includes(p.subCategory)
      );
    }
    if (sortType === "low-high") {
      updated.sort((a, b) => a.price - b.price);
    } else if (sortType === "high-low") {
      updated.sort((a, b) => b.price - a.price);
    }
    setFilteredProducts(updated);
  };

  return (
    <div className="w-full min-h-screen bg-[#08141A] text-white pt-[70px] flex flex-col md:flex-row">
      <div className="w-full md:w-[25vw] lg:w-[18vw] bg-[#08141A] border-r border-[#1f3b45] p-6 md:sticky md:top-[70px] shadow-md z-5">
        <p
          className="text-2xl font-semibold mb-4 flex items-center justify-between md:justify-start md:gap-3 cursor-pointer"
          onClick={() => setShowFilter(!showFilter)}
        >
          FILTERS
          <span className="text-sm md:hidden">{showFilter ? "▲" : "▼"}</span>
        </p>
        <div className={`${showFilter ? "block" : "hidden"} md:block`}>
          {/* CATEGORY BOX */}
          <div className="mb-6 bg-[#0B2C3A] p-4 rounded-xl border border-[#174454]">
            <p className="text-lg font-semibold mb-3 tracking-wide">CATEGORIES</p>
            <div className="flex flex-col gap-2 pl-1">
              {["Men", "Women", "Kids"].map((category) => (
                <label
                  key={category}
                  className="flex gap-2 items-center cursor-pointer hover:text-gray-200"
                >
                  <input
                    type="checkbox"
                    className="accent-blue-500"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                  <span>{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* SUB CATEGORY BOX */}
          <div className="mb-6 bg-[#0B2C3A] p-4 rounded-xl border border-[#174454]">
            <p className="text-lg font-semibold mb-3 tracking-wide">SUB-CATEGORIES</p>
            <div className="flex flex-col gap-2 pl-1">
              {[
                { label: "Top Wear", value: "TopWear" },
                { label: "Bottom Wear", value: "BottomWear" },
                { label: "Winter Wear", value: "WinterWear" },
              ].map((sub) => (
                <label
                  key={sub.value}
                  className="flex gap-2 items-center cursor-pointer hover:text-gray-200"
                >
                  <input
                    type="checkbox"
                    className="accent-blue-500"
                    checked={selectedSubCategories.includes(sub.value)}
                    onChange={() => handleSubCategoryChange(sub.value)}
                  />
                  <span>{sub.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* SORT BY */}
          <div className="mb-6 bg-[#0B2C3A] p-4 rounded-xl border border-[#174454]">
            <p className="text-lg font-semibold mb-3 tracking-wide">SORT BY</p>
            <select
              className="w-full p-2 rounded bg-[#081C25] border border-[#2a4a56] text-white outline-none"
              value={sortType}
              onChange={handleSortChange}
            >
              <option value="relevance">Relevance</option>
              <option value="low-high">Price: Low - High</option>
              <option value="high-low">Price: High - Low</option>
            </select>
          </div>
        </div>
      </div>
      <div className="flex-1 p-6">
        <h1 className="text-3xl mt-[20px] font-bold mb-10 tracking-wide text-center md:text-left">
          All Collections
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6" >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((p, i) => (
              <div
                onClick={() => navigate(`/product_detail/${p._id}`)}
                key={i}
                className="bg-[#0A1A22] border border-[#17333f] rounded-xl overflow-hidden shadow-lg hover:scale-[1.02] transition cursor-pointer"
              >
                <div className="w-full h-[220px] bg-[#13252f] flex items-center justify-center">
                  <img
                    src={p.image1}
                    alt={p.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <p className="text-lg font-semibold truncate">{p.name}</p>
                  <p className="text-gray-300 text-sm mt-1">{currency} {new Intl.NumberFormat("en-IN").format(p.price)}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-400 mt-10">
              No products found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collections;
