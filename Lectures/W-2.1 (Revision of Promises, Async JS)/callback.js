function square(n) {
    return n * n;
}

function cube(n) {
    return n * n * n;
}

// --> callback approach
function sumOfSomething(a, b, callbackFn) {
    let value1 = callbackFn(a);
    let value2 = callbackFn(b);
    return value1 + value2;
}

console.log(sumOfSomething(1,2,square));

/*  --> normal approach
function sumOfSquares(a, b) {
    let square1 = square(a);
    let square2 = square(b);
    return square1 + square2;
}

function sumOfCubes(a, b) {
    let cube1 = cube(a);
    let cube2 = cube(b);
    return cube1 + cube2;
}

let ans = sumOfCubes(1, 2);
console.log(ans);
*/