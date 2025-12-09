
import jwt from "jsonwebtoken";
 
export const isAuth = async(req,res,next) => {
    try {
        let {token} = req.cookies;

        if(!token){
            return res.status(404).json({
                message : "user does not token"
            });
        }

        let verifyToken   =  jwt.verify(token,process.env.SECRET_KEY);
        if(!verifyToken){
            return res.status(404).json({
                message : "user does not have valid token"
            });
        }

        req.userId   =  verifyToken.userId;
        next();

    } catch (error) {
        console.log("IsAuth Error !");
        return res.status(404).json({
            message : `IsAuth Error ${error}`
        });
    }
}