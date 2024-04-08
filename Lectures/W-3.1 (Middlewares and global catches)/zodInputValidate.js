const zod = require('zod')

// if arr is an array of strings with at least  one element, return true else reture false;

// using zod
const validateInput = (arr) => {
    const schema = zod.array(zod.string()).min(1);

    const response = schema.safeParse(arr);

    console.log(response);
}

// normal approach
function validateInput1(arr) {
    if (typeof (arr) === 'object' && arr.length >= 1 && arr.every((e) => typeof (e) === "string")) {
        return true;
    } else {
        return false;
    }
}

validateInput(['a','b','c','d',4])  