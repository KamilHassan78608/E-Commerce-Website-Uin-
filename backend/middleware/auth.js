import { verifyToken } from "../utils/jwt.js";

// Protect Route - require Login
export const protect = (req, res, next) => {
    let token;

    // Get the token from the header
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }

    // Check if token exist
    if(!token){
        return res.status(401).json({
            success : false,
            messege : "Not authorized - No token"
        });
    }

    // Verfiy Token
    const decode = verifyToken(token);
    if(!decode){
        return res.status(401).json({
            success : false,
            messege : "Not authorized - Invalid token"
        });
    }

    req.user = decode;
    next();
}

// Admin Only middleware
export const adminOnly = (req, res, next) => {
    if(req.user && req.user.role === "admin"){
        next();
    }else {
        res.status(403).json({
            success : false,
            messege : "Access denied - Admin Only"
        });
    }
}