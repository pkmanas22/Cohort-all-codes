let count = 0;

function incrementCounter() {
    count++;
    console.log(count);
    setTimeout(incrementCounter, 2 * 1000);
}
incrementCounter()