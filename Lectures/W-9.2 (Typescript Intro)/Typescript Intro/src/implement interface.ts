// interface is used to implement class

interface Person {
    name: string;
    age: number;
    greet(phrase: string):void;
}

class Employee implements Person {
    name: string;
    age: number;

    constructor(n: string, a: number) {
        this.name = n;
        this.age = a;
    }

    greet(phrase: string): void {
        console.log(`${phrase} ${this.name}`);
    }
}

const user = new Employee('Manas',20);
console.log(user);          // Employee { name: 'Manas', age: 20 }
user.greet("Hello")           // Hello Manas    
// console.log(user.greet("hello"))  // If we use this, then it will print greet message and undefined as greet() function does not return anything 
