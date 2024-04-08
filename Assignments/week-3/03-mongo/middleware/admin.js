const { Admin } = require("../db");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const username = req.headers.username;
    const password = req.headers.password;

    const existingUser = await Admin.findOne({
        username,
        password
    })
    // console.log(existingUser);
    if (username && password && existingUser !== null) {
        next();
    }else {
        res.status(404).send("You are not authorized to access this service")
    }

}

module.exports = adminMiddleware;