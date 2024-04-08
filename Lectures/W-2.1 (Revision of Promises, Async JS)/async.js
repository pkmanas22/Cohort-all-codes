const fs = require('fs');

let a = 1;
console.log(a);

fs.readFile("a.txt", "utf-8", (err, data) => {
    console.log("data read from the file is ");
    console.log(data);
})

let ans = 0;
for (let i = 0; i < 100; i++) {
    ans = ans + i;
}

console.log(ans);

// async fuction inside async
setTimeout(() => {
    console.log("From timeout1");
    setTimeout(() => {
        console.log("From inside timeout");
        setTimeout(() => {
            console.log("From 3rd timeout");
        }, 1500);
    }, 1000);
}, 2000);