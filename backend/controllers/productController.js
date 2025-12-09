import uploadOnCloudinary from "../config/cloudinary.js";
import Product from "../models/productModel.js";


export const addProduct  = async(req,res) => {
    try {
        // console.log(req.body)
        const {name,description,price,category,subCategory,sizes,date,bestSeller}  =  req.body;
        // console.log(req.files.image1[0].path)
        let image1  =  await uploadOnCloudinary(req.files.image1[0].path);
        let image2  =  await uploadOnCloudinary(req.files.image2[0].path);
        let image3  =  await uploadOnCloudinary(req.files.image3[0].path);
        let image4  =  await uploadOnCloudinary(req.files.image4[0].path);

        const productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            sizes: typeof sizes === "string" ? sizes.split(",") : sizes,
            date: Date.now(),
            bestSeller: bestSeller === "true",
            image1,
            image2,
            image3,
            image4,
        };


        const product =  await Product.create(productData);
        return  res.status(201).json({
            message : "Product Added Successfully.",
            product
        })

    } catch (error) {
        console.log(error);
        return  res.status(500).json({
            message : "Product Adding Internal Server Error!"
        })
    }
}