import Player from "../../shared/Player.js";

class Game {
    constructor(sockets, app) {
        this.players = new Map();
        this.sockets = sockets;
        this.app = app;
        this.interval = null;
        this.ticks = 30;

    }

    __init__() {
        this.interval = setInterval(this.update.bind(this), 1000 / this.ticks);
    }

    addPlayer(socket) {
        this.sockets.push(socket.id);

        // Generate a position to start this player at.
        const x = 200;
        const y = 200;

        this.players.set(
            socket.id,
            new Player(x, y)
        );
    }

    handleInput(socket, input) {
        const player = this.players.get(socket.id);
        if (input.event == WsInput.KEY) {
            if (player) 
                player.acc = new Vector(input.data.x, input.data.y);
        }
    }


    removePlayer(socket) {
        this.sockets.splice(this.sockets.indexOf(socket.id), 1);
        this.players.delete(socket.id);
    }

    update() {
        // Calculate time elapsed
        const now = Date.now();
        const dt = (now - this.lastUpdateTime) / 1000;
        this.lastUpdateTime = now;
        // Update each player
        this.sockets.forEach((playerID, i) => {
            const player = this.players.get(playerID);
            if (!player)
                return this.sockets.splice(this.sockets.indexOf(playerID), 1);
            for (let j = i + 1; j < this.sockets.length; j++) {
                if (playerID == this.sockets[j]) continue;
                const player2 = this.players.get(this.sockets[j]);
                if (!player2) continue;
                if (Ball.collision(player, player2)) {
                    Ball.penetration_resolution(player, player2);
                    Ball.collision_resoluion(player, player2);
                }
            }

            // console.log(player.pos);
            player.update();
            this.players.set(player.id, player);
        });
        

        // Send a game update to each player every other time
        const published = this.app.publish("STATE/", this.createUpdate(), true);

    }

    createUpdate() {
        const dy = [...this.players.values()].map(p => p.serialize());
        return Message.encode(
            new Message(MessageType.STATE, [
                { t: Date.now(), players: dy }
            ])
        )
    }
}

export default Game;
