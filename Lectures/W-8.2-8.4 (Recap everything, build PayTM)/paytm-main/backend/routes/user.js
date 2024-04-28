const express = require('express')
const zod = require('zod');
const { User, Account } = require('../db');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const authMiddleware = require('../middleware');

const userRouter = express.Router();

const updateZod = zod.object({
    password: zod.string().min(6),
    firstName: zod.string().max(50).trim(),
    lastName: zod.string().max(50).trim(),
})

userRouter.put('/', authMiddleware, async (req, res, userId) => {
    const { success } = updateZod.safeParse(req.body);

    if (!success) {
        return res.status(400).send({
            message: "Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        _id: req.userId
    })

    if (!existingUser) {
        return res.status(400).send({
            message: "User is not registered"
        })
    }

    const user = await User.updateOne({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
    })

    res.json({
        message: "Update successfully"
    })

})

const signupZod = zod.object({
    userName: zod.string().email().max(30).trim().toLowerCase(),
    password: zod.string().min(6),
    firstName: zod.string().max(50).trim().min(1).max(50),
    lastName: zod.string().max(50).trim().min(1).max(50),
})

userRouter.post('/signup', async (req, res) => {
    const { userName, password, firstName, lastName } = req.body;

    function capitalizeFirstChar(str) {
        return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);
    }

    const response = signupZod.safeParse(req.body)

    // console.log(response.error.message);
    if (!response.success) {
        res.status(400).send(response.error.message)
    }

    // const balance = Math.floor(Math.random() * 500000 + 500000);     // in between 5000 to 9999 with 2 precission digits
    const balance = Math.floor(Math.random() * 3 + 8) * 1000 * 100;    // console.log(balance);

    try {
        const existingUser = await User.findOne({
            userName: req.body.userName,
        })

        if (existingUser) {
            return res.status(400).send({
                message: "Email already taken"
            })
        }

        const user = await User.create({
            userName: userName.toLowerCase(),
            password,
            firstName: capitalizeFirstChar(firstName),
            lastName: capitalizeFirstChar(lastName),
        });
        const userId = user._id;
        const token = jwt.sign({
            userId
        }, JWT_SECRET);

        await Account.create({
            userId,
            balance
        });

        res.status(200).send({
            message: "User created successfully",
            token
        });
    } catch (error) {
        console.log(error);
    }

})

const signinZod = zod.object({
    userName: zod.string().email().min(3).max(30).trim().toLowerCase(),
    password: zod.string().min(6),
})

userRouter.post('/signin', async (req, res) => {
    const { userName, password } = req.body;
    const response = signinZod.safeParse(req.body);

    if (!response.success) {
        return res.status(400).send({
            message: "Incorrect username or password"
        })
    }

    const user = await User.findOne({
        userName,
        password
    })


    if (user) {
        const userId = user._id;
        const token = jwt.sign({
            userId
        }, JWT_SECRET);

        res.status(200).send({
            message: "Login successful",
            token
        })
    } else {
        res.status(411).send({
            message: "Incorrect username or password"
        })
    }
})

userRouter.get('/bulk', async (req, res) => {
    const filter = req.query.filter || "";
    // console.log(filter);

    const regex = new RegExp(filter, "i");
    
    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": regex,
            }
        }, {
            lastName: {
                "$regex": regex,
            }
        }]
    })
    // console.log(users.length);
    if (users.length !== 0) {
        res.json({
            user: users.map(user => ({
                userName: user.userName,
                firstName: user.firstName,
                lastName: user.lastName,
                id: user._id
            }))
        })
    } else {
        res.status(400).send({
            msg: "not found"
        })
    }
})

module.exports = userRouter;