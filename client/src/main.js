import Player from "../../shared/Player.js";
import Game from "./components/Game.js";
import Utils from "./components/Utils.js";
import Controller from "./components/Controller.js";
import Network from "./components/Network.js";
import Message from "../../shared/Message.js";

const network = new Network();
const canvas = document.getElementById('canvas');

Utils.resizeCanvas(canvas);

const player = new Player(canvas.width / 2, canvas.height / 2);

const game = new Game(canvas);



(async function () {
    await network.connect();
    // network.send(Message.encode(new Message(Message.type.CONNECT, [])));
    requestAnimationFrame(game.gameLoop.bind(game, player))
})()


window.addEventListener('keydown', (e) => Controller.handleKeys(e, player));
window.addEventListener('keyup', (e) => Controller.handleKeys(e, player));
