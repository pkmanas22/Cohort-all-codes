// filtering
// given an input array, give back all the even values from it

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// simple
const newArr = [];
for (let i = 0; i < arr.length; i++) {
    if (i % 2 == 0) {
        newArr.push(i);
    }
}
console.log(newArr);

// filter
const filterLogic = (i) => {
    return i % 2;
}
const ans = arr.filter(filterLogic);   
console.log(ans);
// return two array [ 0, 2, 4, 6, 8 ] [ 1, 3, 5, 7, 9 ]

console.log(arr.filter((num) => num%2));        // [ 1, 3, 5, 7, 9 ]
console.log(arr.filter((num) => num%2 == 0));        // [ 2, 4, 6, 8, 10 ]