import express from "express";
import { key } from "@repo/common/config"

const app = express();
console.log(key)

app.get('/', (req, res) => {
    res.json({
        msg: 'Hi from backend server'
    })
})

app.listen(8000, () => {
    console.log("Backend server running on port 8000")  
})