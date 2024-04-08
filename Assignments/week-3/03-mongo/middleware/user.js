const { User } = require("../db");

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const username = req.headers.username;
    const password = req.headers.password;
   
    const existingUser = await User.findOne({
        username,
        password
    })
    // console.log(existingUser);
    if (username && password && existingUser !== null) {
        next();
    }else {
        res.status(404).send("Invalid User!!! Please sign up first")
    }
}

module.exports = userMiddleware;