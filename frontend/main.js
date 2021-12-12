const canvas = document.getElementById('game_canvas');
const interpBtn = document.getElementById('interp');
import Controller from './Components/Controller.js';
import Game from './Components/Game.js';
import utils from './Components/Utils.js';
import Network from './Network/index.js';

utils();
canvas.fitCanvas();
const game = new Game(canvas);

const player = {
    id: 1,
    x: 500, y: 500,
    degree: 0,
    velocity: {
        x: 0,
        y: 0
    },
    controls: {
        up: false,
        down: false,
        right: false,
        left: false
    }
}

window.addEventListener('keydown', e => Controller.handleKeys(e, player));
window.addEventListener('keyup', e => Controller.handleKeys(e, player));
interpBtn.addEventListener('click', () => {
    if (Network.interpolate) {
        Network.interpolate = false;
        interpBtn.innerHTML = 'Enable Interpolation';
    } else {
        Network.interpolate = true;
        interpBtn.innerHTML = 'Disable Interpolation';
    }
    
});
// window.addEventListener('mousemove', e => Controller.handleMouse(e, player));

(async function() {
    await Network.connect();
    Network.initUpdates();
    requestAnimationFrame(game.gameLoop.bind(game, player))
})();