const jwt = require('jsonwebtoken')
const JWT_SECRET = require('../index');

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    // using jwt
    const token = req.headers.authorization;        // Bearer fdfjsdffreijri
    const jwtToken = token.split(" ")[1];
    // console.log(jwtToken);

    const decodedValue = jwt.verify(jwtToken, JWT_SECRET);
    console.log(decodedValue);
    if (decodedValue.username) {
        next();
    }else {
        res.status(404).send("You are not authorized to access this service")
    }

}

module.exports = userMiddleware;