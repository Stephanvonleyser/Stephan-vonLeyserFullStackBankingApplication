import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';

const checkAuth = async (req, res, next) => {
    let token = '';

    console.log('Passing CheckAuth:');
    console.log('Headers:', req.headers);
    console.log('Authorization Header:', req.headers.authorization);
    // Check if token is provided
    if (
        req.headers.authorization && 
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            // Extract token
            token = req.headers.authorization.split(" ")[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Find user and attach to the request object
            req.user = await User.findById(decoded.id).select('-password -tokenConfirm -token -createdAt -updatedAt -__v');

            // Check if user exists
            if (!req.user) {
                return res.status(401).json({ msg: 'Token is not valid' });
            }

            return next();
        } catch (error) {
            // Handle token verification failure
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ msg: 'Token has expired' });
            } else if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ msg: 'Token is not valid' });
            }
            // Other errors
            return res.status(500).json({ msg: 'Server error' });
        }
    } else {
        // No token provided
        return res.status(401).json({ msg: 'No authentication token, authorization denied' });
    }
};

export default checkAuth;