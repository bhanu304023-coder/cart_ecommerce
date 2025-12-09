import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadOnCloudinary = async (filepath) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_APIKEY,
      api_secret: process.env.CLOUDINARY_APISECRET,
    });

    if (!filepath) return null;

    const uploadResult = await cloudinary.uploader.upload(filepath);
    fs.existsSync(filepath) && fs.unlinkSync(filepath);

    return uploadResult.secure_url;
  } catch (error) {
    fs.existsSync(filepath) && fs.unlinkSync(filepath);
    console.log(error);
  }
};

export default uploadOnCloudinary;
