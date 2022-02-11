import uws from 'uWebSockets.js';
import uuid from 'uuid-random';
import express from 'express';
import { handleMessages } from './components/handleMessages.js';

const C_PORT = 3000;
const WS_PORT = Number(process.env.PORT) || 8000;
const { App } = uws;
const app = App();
const server = express();
const sockets = [];

server.use(express.static('public'));

app.ws('/*', {
    open: (ws) => {
        ws.id = uuid();
        ws.subscribe('STATE/');
        console.log(`Client connected with id ${ws.id}`);
    },

    message: (ws, message) => {
        handleMessages(ws, message, null);
    },
    close: (ws, code, message) => {
        console.log(`client disconnected with code ${code} and id ${ws.id}`);
    }
}).listen(WS_PORT, (success) => {
    if (success) console.info(`Connected to port: ${WS_PORT}`);
    else console.error("Couldn't connect!");
});

server.listen(C_PORT, () => console.log('started client server'))