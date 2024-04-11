interface User {
    name: String;
    age: number;
}

function sumOfAge(user1: User, user2: User): number {
    return user1.age + user2.age;
}

const age = sumOfAge({ name: 'manas', age: 10 }, { name: 'manas', age: 10 })
console.log(age);
