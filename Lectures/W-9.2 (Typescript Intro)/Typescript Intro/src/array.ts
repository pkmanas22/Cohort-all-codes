// give square bracket [] after the data type so that it will known as array

type numArr = number[];         // using type
// function maxValue(arr: numArr) { }

function maxValue(arr: number[]) {      // arr is declared as array by number[]
    let max = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i]
        }
    }
    return max;
}

console.log(maxValue([1, 2, 3]));


// Q-2
interface User {
	firstName: string;
	lastName: string;
	age: number;
}

function filteredUsers (users: User[]){
    return users.filter(x => x.age >= 18)
}

console.log(filteredUsers([{
    firstName: "harkirat",
    lastName: "Singh",
    age: 21
}, {
    firstName: "Raman",
    lastName: "Singh",
    age: 16
}, ]));