import { decode, encode } from 'msgpack-lite';
import Game from './Game.js';
import Message from '../../shared/Message.js';

/**
 * 
 * @param {WebSocket} ws 
 * @param {ArrayBuffer} msg 
 * @param {Game} game 
 */
export function handleMessages(ws, msg, game) {
    console.log(msg);
    const decoded = Message.inflate(msg);
    console.log(decoded);
    const type = decoded.type;

    switch (type) {
        case Message.type.CONNECT:
            game.addPlayer(ws);
            ws.send(Message.str2ab(JSON.stringify({ msg: 'success' })))
            console.log('added player to game');
            break;
        default:
            console.log(`Got invalid type - ${type}`);
    }

}