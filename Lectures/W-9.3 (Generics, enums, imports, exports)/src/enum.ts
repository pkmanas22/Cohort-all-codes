//  enum -> enumeration
// It is used to define set of named constants

// Example 1 - Game 
// Let’s say you have a game where you have to perform an action based on weather the user has pressed the up arrow key, down arrow key, left arrow key or right arrow key.

// ONE METHOD
type keyInput = 'up' | 'down' | 'left' | 'right'
function doSomething(keyPressed: keyInput) {
    // do something
    if (keyPressed == 'up') {

    }
    //
}
doSomething('up')



// Another is using enu
// by defalut enum gets values 0,1,2,3...
enum Direction {        // no equal sign
    'UP',       // 0
    'DOWN',     // 1
    'LEFT',     // 2
    'RIGHT'     // 3
}

// we can assign value to it
enum Direction2 {
    'UP' = 'up',     // if we assign a string to one, then we have to give in all
    'DOWN' = 'down',
    'LEFT' = 'left',
    'RIGHT' = 'right'
}

// for incrementing value
enum Direction3 {        // no equal sign
    'UP' = 100,
    'DOWN',
    'LEFT',
    'RIGHT'
}

// The final value stored at runtime is still a number (0, 1, 2, 3). 
// follow enum.js to find this as enum is nothing in javascript

function doSomething2(keyPressed: Direction) {
    // do something
    if (keyPressed == Direction.UP) {

    }
    //
}
console.log((Direction3.DOWN));      // 101

// practical cases

// const app = express();

enum ResponseStatus {
    Success = 200,
    NotFound = 404,
    Error = 500
}
// Using enum, there is one place to change status code of a status

// app.get("/', (req, res) => {
//     if (!req.query.userId) {
//         res.status(ResponseStatus.Error).json({})
//     }
//     // and so on...
//     res.status(ResponseStatus.Success).json({});
// })
