const user = {
    name: "manas",
    age: 20,
}
user.name = 'Sanam'
// In the above way we can change the user object. 
// But if we don't want to change the object's value

// we can use 'readonly' before key name;

// By individual
type user = {
    readonly name: string;
    readonly age: number;
}
const user1: user = {
    name: 'manas',
    age: 23
}
// user1.name= 'Sanam'         // this will complain

// BY group
type userGroup = {
    name: string;
    age: number;
}

const userGroup1: Readonly <userGroup> = {
    name: 'fmfmd',
    age: 40,
}
// userGroup1.age = 55;        // this will comlain
