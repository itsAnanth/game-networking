const proto = {
    x: 500,
    y: 500,
    velocity: {
        x: 0,
        y: 0
    },
    degree: 0,
    controls: {
        left: false,
        right: false,
        up: false,
        down: false
    }
}
class Player {

    constructor() {
        this.players = [proto];
    }

}

module.exports = new Player();