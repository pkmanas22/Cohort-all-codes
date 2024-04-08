const express = require('express')

const app = express();

// normal approach
/*
app.get('/health-checkup', (req, res) => {
    const username = req.headers.username;
    const password = req.headers.password;
    const kidneyId = req.query.kidneyKid;
    // username checks
    if (username != "harkirat" || password != "pass") {
        res.status(400).json({ "msg": "Somethings up with your inputs" })
        return
    }
    // input validation
    if (kidneyId != 1 && kidneyId != 2) {
        res.status(400).json({ "msg": "Somethings up with your ionputs" })
        return
    }
    // do something with kidney here
    res.json({
        msg: "Your kidney is fine!"
    })

})*/

app.use(express.json()) // Middleware to parse JSON in the request body

//middleware 1
function userMiddleware(req, res, next) {
    if (username != 'john' && password == 'pass') {
        res.status(400).json({ msg: 'Incorrect inputs!' });
    } else {
        next();
    }
}

//middleware 2
function kidneyMiddleware(req, res, next) {
    if (kidneyId != 1 && kidneyId != 2) {
        res.json({ msg: 'Incorrect inputs' });
    } else {
        next();
    }
}

//using multiple middlewares
app.get('/heart-checkup', userMiddleware, kidneyMiddleware, function (req, res) {
    res.send('Your heart is healthy!');
});

app.get('/kidney-check', userMiddleware, kidneyMiddleware, function (req, res) {
    res.send('Your kidney is healthy!');
});

//using only one middleware
app.get('/health-checkup', userMiddleware, function (req, res) {
    res.send('Your health is fine!');
});

app.listen(3000);