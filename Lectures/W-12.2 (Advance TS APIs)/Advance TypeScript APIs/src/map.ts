// This is javascript concept

// Giving type
type user2 = {
    id: string,
    name: string
}

const usersMap = new Map<string, user2>();  // used for store object of objects
// like this
/*const users = {
    "id@123": {
        id: "id@123",
        name: 'manas'
    },
    "id@124": {
        id: "id@124",
        name: 'manas'
    }
}*/

usersMap.set('key@123', { id: 'manas', name: 'fdfjd' });  // set item first key then value
usersMap.get('key@123') // get item by using key
usersMap.delete('key@123')      // delete item by key
