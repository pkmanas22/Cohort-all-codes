// 1. Problem Statement
// Let’s say you have a function that needs to return the first element of an array. Array can be of type either string or integer.

type ArrType = number | string;

function firstElem(arr: (number | string)[]) { }      // it also works
function firstElem1(arr: ArrType[]) {
    return arr[0];
}

const value = firstElem1([5, 10, 25])
console.log(value);

// P-1 User can send different types of values in inputs, without any type errors
const value2 = firstElem1(['Mans', 10, 25])
// to solve above problem we declare function as
function firstElem2(arr: number[] | string[]) {
    return arr[0];
}
// const value3 = firstElem2(['Mans', 10,25])  -- show error

// P-2 Typescript isn’t able to infer the right type of the return type
// By default typescript set return type as input type , in our case in firstElem1, the return type is of ArrType array
function getFirstElement(arr: (string | number)[]) {
    return arr[0];
}

const el = getFirstElement(["harkiratSingh", "ramanSingh"]);        // e1 type is string | number. so toLowerCase() doesnot work
// console.log(el.toLowerCase())         -- show error


// GENERICS
// To solve the above problem, we use generics

// Generics enable you to create components that work with any data type while still providing compile-time type safety.

// <T> stands for declaring it of types generics. We can use any of the letter but usually T is used

// function identity<P>(arg: P): P {
//     return arg;
// }

function manas <T> (arg: T) {       // return type is T
    return arg;
}
// It automatically generates
let ans = manas('manas');    // type string
let ans1 = manas(100);      // type number
// Best case is to provide the type of <T> during function call
let ans3 = manas <number>('Hello')      // error
let ans4 = manas <string>('Hello')     



// solution to original problem
function generate <T> (arr: T[]): T {
    return arr[0];
}

const result = generate(['Mans', 10, 25, false])          //  type =  string | number | boolean
const result1 = generate <string> (['hi','hello'])
const result2 = generate <number> ([5,10,15])
const result3 = generate <boolean> ([true, false])