const users: usersTypeRecord = {
    "id@123": {
        id: "id@123",
        name: 'manas'
    },
    "id@124": {
        id: "id@124",
        name: 'manas'
    }
}

// What is the type of users
/*type userType = {
    id: string,
    name: string
}

type usersType = {
    [key: string]: userType
}*/
// or we can write like this
type usersType = {
    [key: string]: {
        id: string,
        name: string
    }
}


// Cleaner way to use this is 'RECORD'
type usersTypeRecord = Record <string, {id: string, name: string}>