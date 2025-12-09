import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const getToken = (userId) => {
  try {
    return jwt.sign({ userId }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
  } catch (error) {
    console.log("Token creation error:", error.message);
  }
};

export const getTokenForAdmin = (email) => {
  try {
    return jwt.sign({ email }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
  } catch (error) {
    console.log("Token creation error:", error.message);
  }
};
