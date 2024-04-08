// Assignment #1 - Create a function isLegal that returns true or false if a user is above 18. It takes a user as an input.

function isLegal(user: {
    firstName: string;
    lastName: string;
    age: number;
}): boolean {
    return user.age >= 18;
}
function greet2(user: {
    firstName: string;
    lastName: string;
    age: number;
}): void {
    console.log("Hello" + user.firstName);
}
const ans = isLegal({
    firstName: "Manas",
    lastName: "pradhan",
    age: 20,
});

console.log(ans);

// In the above two functions isLegal & greet there is violating rule of DRY as user object is repeated.
// To solve this there is concept of interface in typescript

// syntax
/*
*   interface [name] {              // no need to equal sign after name
*    ...
*    }
*/

interface User {
    firstName: string,
    lastName: string;
    age: number;
    address?: string; // This indicates that the address property is optional
}

function isLegal2(user: User): boolean {
    return user.age >= 18;
}

function greet3(user: User) {
    console.log("Hello" + user.firstName);
}