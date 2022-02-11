// import Network from "../Network/index.js";

class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.unit = 100;
        this.unitVelocity = 2;
    }

    async gameLoop(player) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.render(player);
        // this.renderFromServer();
        // pingHolder.innerHTML = `${Network.ping} ms`
        requestAnimationFrame(this.gameLoop.bind(this, player))
    }

    // async renderFromServer() {
    //     const player = Network.interpolate ? Network.getCurrentState() : Network.getPlayer();
    //     // console.log(player)
    //     const context = this.ctx;
    //     context.beginPath();
    //     context.fillStyle = 'red';
    //     player ? context.fillRect(player.x, player.y, 32, 32) : () => {};
    //     context.closePath();
    // }

    render(player) {
        const context = this.ctx;
        const canvas = this.canvas;


        // Network.update(player);

        player.update();

        // boundary check
        if (player.x <= 0) player.x = 0;
        if (player.y <= 0) player.y = 0;
        if (player.y + 32 >= canvas.height) player.y = canvas.height - 32;
        if (player.x + 32 >= canvas.width) player.x = canvas.width - 32;

        context.fillStyle = 'black';
        context.fillRect(player.x, player.y, 32, 32);


    }

}

export default Game;