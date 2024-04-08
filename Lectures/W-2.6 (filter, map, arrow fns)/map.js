// given an array, give back a new array in which every value is multiplied by 2
const input = [1,2,3,4,5];

// simple approach
const newArr = [];
for(let i = 0; i < input.length; i++){
    newArr.push(input[i] * 2);
}
console.log(newArr);

// using map approach
// originalArray.map(transformationFunction)
function transform(i) {
    return i * 2;
}
const ans = input.map(transform);
console.log(ans);

// Question: Create a map function that takes 2 inputs an array and a transformation callback funcion and transforms the array into a new one using the transfomratin function 
const mapFn  = (arr, cb) => {
    return arr.map(cb);
}
const square = mapFn(input, function(elem) { return elem*elem; } )
console.log(square);