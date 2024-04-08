const express = require('express')
const zod = require('zod')

const app = express();
// zod -> it requires for input validation
// first require zod
// then create schema using zod
// then safeParse with the input

const schema = zod.array(zod.number())

// create custom schema
// {
//     email: string == email type
//     password: at least 8 character
//     country : "IN", "US"
// }
const mySchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8),
    country: zod.literal('IN').or(zod.literal('US')),
})

app.use(express.json())

app.get('/health-checkup', function (req, res) {
    // kidneys = [1,2]
    const kidneys = req.body.kidneys;
    const response = schema.safeParse(kidneys);

    if (response.success) {
        res.send(response)
    } else {
        res.send("Invalid input")
    }
});

app.listen(3000)