let x: number = 1;
// x = 'harkirat'      /* error */
console.log(x);

// problem-1
function greet(firstName: string) {
  console.log("Hello " + firstName);
}

greet("Manas");

// Sum function - Problem 2

function sum(a: number, b: number): number {
  // best practice
  return a + b;
}
console.log(sum(1, 2));

// here a: number, b: number, and also return number
// so best practice is give :number for return type
// Otherwise it also fetch from return statment

function sum2(a: number, b: number) {
  return a + b;
}
console.log(sum2(1, 2)); // type - number

function sum3(a: number, b: number) {
  return a + "b";
}
console.log(sum3(1, 2)); // type - String

// problem - 3 return boolean
function isEligible(age: number): boolean {
  return age >= 18;
}
console.log(isEligible(18));

// problem-4 /* Create a function that takes another function as input and runs it after 1 second

function runAfter1s(fn: () => void) {
  /*
   * type of fn is function so that we use () and return void so that () => void
   * If the callback function return number we have to write () => number
   * */
  setTimeout(fn, 1000);
}
runAfter1s(() => console.log("Hi there"));
