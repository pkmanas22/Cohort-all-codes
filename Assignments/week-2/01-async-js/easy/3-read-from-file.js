const fs = require('fs');

fs.readFile('3-read-from-file.md', 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);

    // Additional operation after reading the file
    expensiveOperation();
});

console.log("after read file");

function expensiveOperation() {
    // Simulating an expensive operation
    let sum = 0;
    for (let i = 0; i < 1000000; i++) {
        sum += i;
    }
    console.log("Result of expensive operation:", sum);
}

console.log("after loop");
