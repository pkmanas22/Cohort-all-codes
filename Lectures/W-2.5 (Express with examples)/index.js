// creating an http server
// express
// must be install node

const express = require('express')

const app = express();

function sum(n) {
    let ans = 0;
    for(let i = 0; i <= n; i++){
        ans +i;
    }
    return ans;
}

// req --> request
// res --> response
app.get('/', function (req, res) {
    const n = req.query.n;
    const ans = sum(n)
    res.send('Hi there answer is ' + ans)
})

app.listen(3000);
