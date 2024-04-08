const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const jwtPassword = "123456";

mongoose.connect(
    "mongodb://127.0.0.1:27017/kiratDB?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.",
);

const app = express();
app.use(express.json());

const User = mongoose.model("users", {
    name: String,
    username: String,
    password: String,
});

app.post("/signin", async function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const existingUser = await User.findOne({ username, password });

    if (existingUser && existingUser.username == username && existingUser.password == password) {
        var token = jwt.sign({ username: username }, jwtPassword);
        res.send( existingUser );
    }

    return res.status(403).json({
        msg: "User doesnt exist in our in mongo db",
    });


});

app.post("/signup", async function (req, res) {
    uname = req.body.name;
    username = req.body.username;
    password = req.body.password;

    const existingUser = await User.findOne({ username });
    // console.log(existingUser);

    if (existingUser && existingUser.username == username) {
        return res.status(403).json({
            msg: "User already exists. Try using another username",
        });
    }

    try {
        const newUser = await User.create({
            name: uname,
            username: username,
            password: password,
        })
        // console.log(newUser);
        var token = jwt.sign({ username: newUser }, jwtPassword);
        return res.json({
            token,
        });
    } catch (error) {
        // console.log(error);
        res.json("Something bad happens")
    }
});

app.get("/users", async function (req, res) {
    const token = req.headers.authorization;
    try {
        const decoded = jwt.verify(token, jwtPassword);
        const username = decoded.username;
        // return a list of users other than this username from the database
        // console.log(username);
        const allUsers = await User.find({});
        
        const updateUser = allUsers.filter((each) => each.username !== username.username)
        res.send(updateUser);

    } catch (err) {
        console.log(err);
        return res.status(403).json({
            msg: "Invalid token",
        });
    }
});

app.listen(3000);