const express = require('express')

const app = express();

app.use(express.json())

app.get('/health-checkup', function (req, res) {
    // kidneys = [1,2]
    const kidneys = req.body.kidneys;
    const kidneyLength = kidneys.length;
    res.send("You have " + kidneyLength + " kidneys")
});

// global catches
// it takes four arguments --> err, req, res, next
// this middleware is used for error handling
// it places after all routes details covered
function errorHandler(err, req, res, next) {
    console.error("Error:" + err);
    res.status(500).json({err: "Something went wrong"})
}
// app.use(errorHandler)

// or
app.use((err, req, res, next) => {
    console.error("Error:" + err);
    res.status(500).json({err: "Something went wrong"})
})

app.listen(3000)