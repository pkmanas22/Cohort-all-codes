const express = require('express');
const cardModel = require('./db');
const createCard = require('./validate');
const cors = require('cors');

const app = express();

app.use(cors())
app.use(express.json())

app.get('/allcards', async (req, res) => {
    const allCards = await cardModel.find({});
    res.json({
        allCards
    })
})

app.post('/createcard', async (req, res) => {
    const createPayload = req.body;

    if (!createPayload) {
        return res.status(400).json({
            msg: "Missing request body"
        });
    }

    const payLoad = createCard.safeParse(createPayload);

    if (!payLoad.success) {
        const errors = payLoad.error.errors;
        const errorMsg = {};

        for (const [field, fieldErr] of Object.entries(errors)) {
            errorMsg[fieldErr.path] = fieldErr.message;
        }
        console.log(errorMsg);
        return res.status(400).json({
            msg: "Validation Error",
            errors: errorMsg,
        });
    }

    try {
        const newCard = await cardModel.create({
            name: createPayload.name,
            desc: createPayload.desc,
            interestList: createPayload.interestList,
            socialMedia: createPayload.socialMedia,
        })

        return res.json({
            msg: "Card created",
            id: newCard._id,
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: "Internal Server Error"
        });
    }
})

app.all('*', (req, res) => {
    res.json({
        msg: "Invalid URL"
    })
})

app.listen(3000, () => console.log("Server started"));