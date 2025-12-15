import User from "../models/userModel.js"

export const addToCart  = async(req,res) => {
    try {
        let {productId, size}  = req.body;

        let userData =  await User.findById(req.userId);
        if(!userData){
            return  res.status(404).json({
                message : "No User Found !"
            })
        }

        let cartData  =   userData.cartData || {};
        if(cartData[productId]){
          if(cartData[productId][size]){
            cartData[productId][size] += 1;
          }else {
            cartData[productId][size] = 1;
          }
        }else{
          cartData[productId] = {};
          cartData[productId][size] = 1;
        }

        await User.findByIdAndUpdate(req.userId,{cartData})

        return  res.status(201).json({
            message : "Added to cart" 
        })
    } catch (error) {
        console.log(error)
        return  res.status(500).json({
            message : "Addying to cart error!"
        })
    }
}

export const updateCart  = async(req,res) => {
    try {
        const {productId,size,quantity} =  req.body;
        let userData =  await User.findById(req.userId);
        let cartData =  await userData.cartData;

        cartData[productId][size]   =   quantity;
        await User.findByIdAndUpdate(req.userId,{cartData})
        return  res.status(201).json({
            message : "update the cart" 
        })
    } catch (error) {
        console.log(error)
        return  res.status(500).json({
            message : "Updating to cart error!"
        })
    }
}

export const getUserCart  = async(req,res) => {
    try {
        let userData =  await User.findById(req.userId);
        let cartData =  await userData.cartData;
        return  res.status(201).json({
            message : "User Cart Details.",
            cartData 
        })
    } catch (error) {
        return  res.status(500).json({
            message : "User Cart Details error!"
        })
    }
}