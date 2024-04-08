const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config');

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    // using jwt
    const token = req.headers.authorization;        // Bearer fdfjsdffreijri
    const jwtToken = token.split(" ")[1];
    // console.log(jwtToken);

    const decodedValue = jwt.verify(jwtToken, JWT_SECRET);
    // console.log(decodedValue);
    if (decodedValue.username) {
        next();
    }else {
        res.status(404).send("You are not authorized to access this service")
    }

}

module.exports = adminMiddleware;