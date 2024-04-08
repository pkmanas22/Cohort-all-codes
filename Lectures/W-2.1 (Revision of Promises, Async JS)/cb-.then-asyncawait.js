
// async/await  >> promis/.then >> callback

// callback syntax
function kiratsAsyncFunction(callback) {
    callback("hi there!")
    async function main() {
        kiratsAsyncFunction(function (value) {
            console.log(value);
        });
    }
}
main();



// Promise .then syntax
function kiratsAsyncFunction2() {
    let p1 = new Promise(function (resolve) {
        resolve("hi there!")
    });
    return p1;
}
function main2() {
    kiratsAsyncFunction2().then(function (value) {
        console.log(value);
    });
}
main2();



// Async / await syntax
function kiratsAsyncFunction3() {
    let p2 = new Promise(function (resolve) {
        resolve("hi there!")
    });
    return p2;
}
async function main() {
    const value = await kiratsAsyncFunction3();
    console.log(value);
}
main();