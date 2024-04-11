interface newUser {
    id: number;
    name: String;
    age: number;
    address: String;
}

/*interface updateUser{
    name: String;
    age: number;
    address: String;
}*/

// If we want to change age to string, then we have to change in multiple places. And doesnot follow DRY rule.
// So that we use pick 
type updateUser1 = Pick <newUser, 'name' | 'age' | 'address' >      // It takes 2 values. First one is the interface and next one is items

function updateUserDetails (updateUser: updateUser1){
    
}