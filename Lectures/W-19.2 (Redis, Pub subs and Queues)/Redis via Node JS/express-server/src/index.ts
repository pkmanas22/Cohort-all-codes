import express from 'express';
import { createClient } from 'redis';

const app = express();
app.use(express.json());

const client = createClient();
client.on('error', (err) => console.log('Redis Client Error', err));

client.on('ready', () => console.log("Redis Client Ready"));

app.post('/submit', async (req, res) => {
    const { problemId, userId, code, language } = req.body;

    try {
        await client.lPush('submissions', JSON.stringify({ problemId, userId, code, language }));
        // store in database
        res.status(200).json({
            msg: "Submission received successfully"
        })
    } catch (error) {
        console.error("Failed to store submission in Redis:", error);
        res.status(500).json({
            msg: "Failed to store submission in Redis"
        })
    }
})

async function startServer() {
    try {
        await client.connect();
        console.log("Connected to Redis");

        app.listen(3000, () => console.log("Server started on port 3000"));
    } catch (err) {
        console.error("Failed to connect to Redis:", err);
    }
}

startServer();