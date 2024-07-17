import express from 'express';
import WebSocket , { WebSocketServer } from 'ws';

const app = express();
const httpServer = app.listen(3000, () => {
    console.log('listening on http://localhost:3000')
});

const wss = new WebSocketServer({ 
    server: httpServer,
});

let userCnt = 0;
wss.on('connection', function connection (socket) {
    socket.on('error', function socketError (err) {
        console.error(err);
    })

    socket.on('message', function message (data) {
        wss.clients.forEach(function each (client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data, {binary: false});
            }
        });
    });

    socket.send("Hello from server " + ++userCnt);
})