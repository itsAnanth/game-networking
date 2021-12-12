const protocol = window.location.protocol == 'https' ? 'wss' : 'ws';
const PORT = 3000;
const ws = new WebSocket(`${protocol}://localhost:${PORT}`);

class Network {

    constructor() {
        this.firstServerTimestamp = 0;
        this.ping = null;
        this.gameStart = 0;
        this.updates = [];
        // 30 ticks
        this.ticks = 30;
        this.RENDER_DELAY = Math.floor(1000 / this.ticks); // x ticks per second
        this.interpolate = false;
    }
    connect() {
        return new Promise(resolve => {
            ws.onopen = () => {
                console.log('Connected');
                resolve(true);
            }
        })
    }

    // main ws call to backend
    getState() {
        const pingS = Date.now();
        const obj = {
            method: 'state'
        };
        const payLoad = JSON.stringify(obj);
        ws.send(payLoad);

        return new Promise(resolve => {
            ws.onmessage = (msg) => {
                const response = JSON.parse(msg.data);
                if (response.method === 'state') {
                    this.ping = Math.abs(pingS - Date.now());
                    resolve(response);
                }
            }
        })
    }


    // for non-interpolated example using latest update
    getPlayer() {
        return this.updates[this.updates.length - 1].player;
    }

    processGameUpdate(update) {
        if (!this.firstServerTimestamp) {
            this.firstServerTimestamp = update.t;
            this.gameStart = Date.now();
        }
        this.updates.push(update);

        const base = this.baseUpdate();
        if (base > 0) 
            this.updates.splice(0, base);
        
    }

    async initUpdates() {
        setInterval(() => {
            this.getState().then(u => this.processGameUpdate(u));
        }, this.RENDER_DELAY);
    }

    currentServerTime() {
        return this.firstServerTimestamp + (Date.now() - this.gameStart) - this.RENDER_DELAY;
    }

    getCurrentState() {
        const base = this.baseUpdate();
        const serverTime = this.currentServerTime();
        // there's only 1 update, use that
        if (base < 0 || base == this.updates.length - 1) return this.updates[this.updates.length - 1].player;
        else {
            // interpolate adjacent updates
            const baseU = this.updates[base];
            const nextU = this.updates[base + 1];
            const ratio = Math.min(1.5, (serverTime - baseU.t) / (nextU.t - baseU.t));
            const player = baseU.player;
            player.x = this.interPolate(baseU.player.x, nextU.player.x, ratio);
            player.y = this.interPolate(baseU.player.y, nextU.player.y, ratio);
            return player;
        }
    }

    interPolate(x, y, ratio) {
        return x + (y - x) * ratio;
    }

    baseUpdate() {
        const st = this.currentServerTime();
        for (let i = this.updates.length - 1; i >= 0; i--) {
            if (this.updates[i].t <= st) return i;
        }
        return -1;
    }


    update(player) {
        const obj = {
            method: 'update',
            player: player
        }

        ws.send(JSON.stringify(obj));
    }
}

export default new Network();