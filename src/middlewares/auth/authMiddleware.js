// authMiddleware to verify if user is logged in
import jwt from 'jsonwebtoken';
import dotenv from "dotenv"; 

dotenv.config();

// Authenticates user's credentials and grants access
const authMiddleware = (req, res, next) => {
    const cookie = req.cookies;
    
    // Verifies if there's an authorization header or if the token follows jwt format 
    if(!cookie.jwt) {
        return res.status(401).json({ message: 'Please enter your login credentials to access'}); 
    }

    const token = cookie.jwt; 

    try {
        // Verifies if the signature is valid and returns decoded payload
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user; 

        next(); 
    } 
    
    catch (error) {
        return res.status(401).json({ message: 'Invalid token, access denied' }); 
    }
}

export default authMiddleware; 