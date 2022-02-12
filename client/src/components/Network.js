import Message from "../../../shared/Message";

const url = 'ws://localhost:8000';
class Network extends WebSocket {
    constructor() {
        super(url);
        this.binaryType = 'arraybuffer'
        this._safeSend = Message.safeSend(this.send.bind(this));
        this.__init__();
    }
    
    __init__() {
        this.onmessage = (msg) => {
            console.log(msg.data);
        }
    }


    connect() {
        return new Promise((res, rej) => {
            this.onopen = () => {
                console.log('ws handshake successful');
                this.send(Message.encode(new Message(Message.type.CONNECT, [])));
                res(true)
            };
        })
    }
}

export default Network;