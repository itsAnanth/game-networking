import uws from 'uWebSockets.js';
import uuid from 'uuid-random';
import { handleMessages } from './components/handleMessages.js';
import Game from './components/Game.js';

const WS_PORT = Number(process.env.PORT) || 8000;
const { App } = uws;
const app = App();
const sockets = [];
const game = new Game(sockets, app);


app.ws('/*', {
    open: (ws) => {
        ws.id = uuid();
        ws.subscribe('STATE/');
        console.log(`Client connected with id ${ws.id}`);
    },

    message: (ws, message) => {
        handleMessages(ws, message, game);
    },
    close: (ws, code, message) => {
        console.log(`client disconnected with code ${code} and id ${ws.id}`);
    }
}).listen(WS_PORT, (success) => {
    if (success) console.info(`Connected to port: ${WS_PORT}`);
    else console.error("Couldn't connect!");
});
