import React from "react";

const NewLetterBox = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted");
  };

  return (
    <div className="
      w-full 
      min-h-[28vh] 
      flex flex-col items-center 
      justify-start 
      gap-4 
      bg-gradient-to-b from-[#141414] to-[#0c2025] 
      text-white 
      px-4 py-8
    ">
      
      {/* Title */}
      <p className="text-lg sm:text-xl font-semibold text-center">
        Subscribe now & get 20% off
      </p>

      {/* Subtitle */}
      <p className="text-center max-w-[600px] text-sm sm:text-base opacity-80 px-2">
        Subscribe now and enjoy exclusive savings, special deals and early access
        to new collections.
      </p>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="
          flex flex-col sm:flex-row 
          gap-3 
          w-full max-w-[420px] 
          mt-4
        "
      >
        <input
          type="email"
          placeholder="Enter your email"
          className=" w-full  px-3 py-2   rounded-md  outline-none  bg-white text-black   "         required        />

        <button
          type="submit"
          className="  w-full sm:w-auto px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition text-sm sm:text-base  ">
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewLetterBox;
