// arrow function
// both are same

function sum(a, b) {
    return a + b;
}

const sum = (a, b) => {
    return a + b;
}

app.get('/', function (req, res) {

})

app.get('/', (req, res) => {

})

const ans = sum(1, 2)
console.log(ans);