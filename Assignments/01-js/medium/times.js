/*
Write a function that calculates the time (in seconds) it takes for the JS code to calculate sum from 1 to n, given n as the input.
Try running it for
1. Sum from 1-100
2. Sum from 1-100000
3. Sum from 1-1000000000
Hint - use Date class exposed in JS
There is no automated test for this one, this is more for you to understand time goes up as computation goes up
*/


function calculateTime(n) {
    let t1 = new Date();
    let t1inMS = t1.getTime();
    console.log(calcuateSum(n));
    let t2 = new Date();
    let t2inMS = t2.getTime();

    console.log(t1inMS);
    console.log(t2inMS);
    let timeTaken = t2inMS - t1inMS;

    return timeTaken;
}

function calcuateSum(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

console.log(calculateTime(1000000));
