const jwt = require('jsonwebtoken');

const checkUserAuth = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from the header

    if (!token) {
        return res.status(401).send({ message: 'Unauthorized: No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            console.error('Token verification error:', err);
            return res.status(403).send({ message: 'Failed to authenticate token', error: err.message });
        }
        
        console.log('Decoded token:', JSON.stringify(decoded, null, 2));

        // Check for both _id and userID for backward compatibility
        if (!decoded._id && !decoded.userID) {
            console.error('Token does not contain _id or userID');
            return res.status(400).send({ 
                message: 'Invalid token structure',
                tokenContent: decoded
            });
        }

        // If userID is present, use it as _id
        if (decoded.userID) {
            decoded._id = decoded.userID;
        }

        req.user = decoded; // Save decoded user data to request for later use
        next();
    });
};

module.exports = checkUserAuth;