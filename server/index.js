const express = require('express');
const cors = require('cors');
const { createServer: createHttpServer } = require('http');
const { Server: WebSocketServer } = require('ws');
const { createNumberAction, createDisconnectAction } = require('./action-creators');

let currentNumber = 0;
const app = express();
app.use(cors());

const server = createHttpServer(app);
const wss = new WebSocketServer({ server });

let sockets = [];
wss.on('connection', webSocket => {
    webSocket.on('error', broadcastDisconnected(webSocket));
    webSocket.send(createNumberAction(currentNumber));
    sockets.push(webSocket);
});

function broadcastDisconnected(webSocket) {
    return err => {
        const action = createDisconnectAction(err);

        sockets = sockets.filter(s => s !== webSocket);
        sockets.forEach(s => s.send(action));
    }
}

function incrementNumber() {
    return () => {
        currentNumber++;
        const action = createNumberAction(currentNumber);
        sockets.forEach(s => s.send(action));
        console.log(`Sent ${currentNumber} to clients.`);
    };
}

setInterval(incrementNumber(), 1000);

server.listen(process.env.PORT || 8081, () => {
    console.log(`Started listening on port ${server.address().port}...`);
})