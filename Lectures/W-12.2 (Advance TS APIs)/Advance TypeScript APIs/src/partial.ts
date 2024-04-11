interface newUser {
    id: number;
    name: String;
    age: number;
    address: String;
}

/*interface updateUser{
    name?: String;
    age?: number;
    address?: String;
}*/

// If we want to give the items as optional. Either use '?' mark or use partial

type partialUser = Partial<newUser>       // all are optional

function updateUserDetails1(partialUser: partialUser) {

}