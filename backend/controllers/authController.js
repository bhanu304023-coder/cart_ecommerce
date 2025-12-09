import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import validator from "validator";
import { getToken, getTokenForAdmin} from "../config/token.js";

export const Register = async (req, res) => {
  try {
    console.log(req.body)
    const { name, email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        message: "User already exists, please register with a new email",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });
    const token = getToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(201).json({
      message: "User registered successfully",
      user,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Register Server Error",
      error: error.message,
    });
  }
};

export const login = async(req,res) => {
    try{
        
        let {email,password}  =  req.body;

        const userExists   =  await User.findOne({email});
        if(!userExists){
            res.status(404).json({
                message : "User not found !" 
            })
        }

        let isMatch  =  await bcrypt.compare(password,userExists.password);
        if(!isMatch){
            res.status(404).json({
                message : "Password doesn't match !" 
            })
        }

        const token = getToken(userExists._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, 
        });

        return res.status(201).json({
            message: "User login successfully",
            userExists,
        });

    }catch(err){

        return res.status(500).json({
            message: "Logined server error~!",
            error: error.message,
        });

    }
}

export const logout = async(req,res) => {
    try {
        res.clearCookie("token");
        return res.status(201).json({
            message: "logout successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: "logout server error!",
            error: error.message,
        });
    }
}


export const googleLogin = async (req, res) => {
  try {
    const { name, email } = req.body;
    
    let user = await User.findOne({ email });
    
    if (!user) {
      user = await User.create({ name, email });
      // console.log(user)
    }

    const token = await getToken(user._id);

    res.cookie("token",token,{
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "User registration successful",
      user,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Google Auth Error",
      error: error.message,
    });
  }
};


export const AdminLogin = async(req,res)  => {
  try {
    const {email,password} = req.body;

    if(email  === process.env.ADMIN_EMAIL && password  === process.env.ADMIN_PASSWORD){

      const token = await getTokenForAdmin(email);
      // console.log(token)
      res.cookie("token",token,{
        httpOnly: true,
        secure: false,
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(201).json({token});
    }else{
      return res.status(404).json({
        message : "Invalid Credentials"
      });
    }
  } catch (error) {
    return res.status(500).json({
      message : "Admin Login Server Error",
      error : error
    })
  }
}

export const AdminLogout = async(req,res) => {
    try {
        res.clearCookie("token");
        return res.status(201).json({
            message: "logout successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: "logout server error!",
            error: error.message,
        });
    }
}