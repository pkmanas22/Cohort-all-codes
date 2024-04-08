// basic express with express.json() middleware
const express = require('express');
const { createTodo, updateTodo } = require('./types');
const todoModel = require('./db');
const cors = require('cors');

const app = express();

app.use(express.json())
app.use(cors({}));      // By using cors, frontend can fetch the data

app.post('/todo', async (req, res) => {
    const createPayload = req.body;
    
    if (!createPayload) {
        return res.status(400).json({
            msg: "Missing request body"
        });
    }

    const parsedPayload = createTodo.safeParse(createPayload);
    
    if (!parsedPayload.success) {
        return res.status(400).json({
            msg: "Wrong input"
        });
    }

    try {
        // push into mongo
        const data = await todoModel.create({
            title: createPayload.title,
            desc: createPayload.desc,
            isCompleted: false,
        });

        return res.json({
            msg: "Todo created",
            id: data._id,
        });
    } catch (error) {
        // Handle errors appropriately
        console.error(error);
        return res.status(500).json({
            msg: "Internal Server Error"
        });
    }
});


app.get('/todos', async (req, res) => {
    const allTodos = await todoModel.find({});
    res.json({
        allTodos
    })
})

app.put('/completed', async (req, res) => {
    const createPayload = req.body;
    const parsedPayload = updateTodo.safeParse(createPayload);
    if (!parsedPayload.success) {
        res.status(404).json({
            msg: "Wrong input"
        })
    }

    const todo = await todoModel.findOneAndUpdate({
        _id: createPayload.id,
    }, {
        isCompleted: true,
    })

    res.json({
        msg : "Todo marked as completed",
    })
})

app.listen(3000, () => { console.log("connected"); })