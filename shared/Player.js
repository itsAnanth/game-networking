class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.degree = 0;
        this.xvel = 0;
        this.yvel = 0;
        this.controls = {
            up: false,
            down: false,
            right: false,
            left: false
        }
        this.unitVelocity = 2;
    }

    update() {
        if (this.controls.up)
            this.yvel -= this.unitVelocity;
        if (this.controls.down)
            this.yvel += this.unitVelocity;
        if (this.controls.left)
            this.xvel -= this.unitVelocity;
        if (this.controls.right)
            this.xvel += this.unitVelocity;

        this.x += this.xvel;
        this.y += this.yvel;
        this.xvel *= 0.85;//friction
        this.yvel *= 0.85;// friction
    }

    serialize() {
        return {
            x: this.x,
            y: this.y
        }
    }
}


export default Player;