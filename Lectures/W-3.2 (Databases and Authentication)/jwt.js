const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

const app = express();

app.use(express.json())

const ALL_USERS = [
    {
        username: "harkirat@gmail.com",
        password: "123",
        name: "harkirat singh",
    },
    {
        username: "raman@gmail.com",
        password: "123321",
        name: "Raman singh",
    },
    {
        username: "priya@gmail.com",
        password: "123321",
        name: "Priya kumari",
    },
];

function userExists(username, password) {
    // write logic to return true or false if this user exists
    // in ALL_USERS array
    // try using find in js

    // find
    const index = ALL_USERS.findIndex((uname) => username == uname.username)
    // console.log(index);
    return index >= 0;

    // normal
    /*
    const isExists = false;
    for (let i = 0; i < ALL_USERS.length; i++) {
        if (username == ALL_USERS[i].username && password == ALL_USERS[i].password) {
            return true;
        }
    }
    return isExists;
    */
}

app.post("/signin", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    if (!userExists(username, password)) {
        return res.status(403).json({
            msg: "User doesnt exist in our in memory db",
        });
    }

    var token = jwt.sign({ username: username }, jwtPassword);
    return res.json({
        token,
    });
});

app.get("/users", function (req, res) {
    const token = req.headers.authorization;
    // console.log(token);
    try {
        const decoded = jwt.verify(token, jwtPassword);
        const username = decoded.username;
        // console.log(username);
        // return a list of users other than this username
        const otherUser = [];
        // using map 
        ALL_USERS.map((each) => {
            if (each.username !== username) {
                otherUser.push(each)
            }
        })

        // normal approach
        /*
        for (let i = 0; i < ALL_USERS.length; i++) {
            if(ALL_USERS[i].username != username){
                otherUser.push(ALL_USERS[i])
            }            
        }
        */
        res.status(200).json(otherUser)
    } catch (err) {
        console.log(err);
        return res.status(403).json({
            msg: "Invalid token",
        });
    }
});

app.listen(3000)