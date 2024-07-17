import http from 'http';
import WebSocket, { WebSocketServer } from 'ws';

const server = http.createServer(function (req: any, res: any) {
    console.log((new Date()) + ' Received request for ' + req.url);
    res.end("Hi there");
})

const wss = new WebSocketServer({ server });

let userCnt = 0;
wss.on('connection', function connection(socket) {
    socket.on('error', function (err) {
        console.error(err)
    })

    socket.on('message', function message(data, isBinary) {
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data, {
                    binary: isBinary
                })
            }
        });
    });
    console.log("User connected: " + ++userCnt);
    socket.send('User ' + userCnt + ' joined the chat');
})

server.listen(8080, function listening() {
    console.log((new Date()) + ' Server is listening on port 8080');
})