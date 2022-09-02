var jwt = require('jsonwebtoken');

const  tokenVerify = (req, res, next) => {
    // Check if token exists
    const token = req.get('Authorization').split(' ')[1];

    if(!token){
        const error = new Error('Not token provided');
        error.statusCode = 401;
        throw error;
    }

    try {
        // Verify token
        decodedToken = jwt.verify(token, 'secret');
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }

    if(!decodedToken){
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;
    }

    // Pass user id to next middleware
    req.userId = decodedToken.userId;
    next();

}

module.exports = tokenVerify;