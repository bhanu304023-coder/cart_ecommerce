import jwt from 'jsonwebtoken';

const adminAuth   = async(req,res,next) => {
    try {

        let {token} = req.cookies;
        if(!token){
            return res.status(404).json({
                message : "Not Authorized Login Again"
            });
        }
        let verifyToken   =  jwt.verify(token,process.env.SECRET_KEY);
        if(!verifyToken){
            return res.status(404).json({
                message : "Not Authorized Login Again,Invalid Token"
            });
        }
        req.adminEmail   =  process.env.ADMIN_EMAIL;
        next();

    } catch (error) {

        console.log("adminAuth Error !");
        return res.status(404).json({
            message : `adminAuth Error ${error}`
        });

    }
}

export default adminAuth;