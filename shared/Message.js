import Enum from "./Enum.js";
import { decode as msgpack_decode, encode as msgpack_encode } from "msgpack-lite";

class Message {

    constructor(type, data) {
        this.type = type;
        this.data = data;
    }

    static inflate(data) {
        let _data = new Uint8Array(data instanceof DataView ? data.buffer : data);
        let decoded_message = msgpack_decode(_data);
        if (!Array.isArray(decoded_message)) {
            try {
                decoded_message = Array.from(decoded_message);
                if (!decoded_message) return false;
            } catch(e) {
                return false;
            }
        }

        const msgT = new Message(decoded_message.shift(), decoded_message.length == 0 ? [] : decoded_message);
        return msgT
    }

    static deflate(msg) {
        return [msg.type, ...(msg.data || [])];
    }

    static encode(data) {
        return msgpack_encode(Message.deflate(data));
    }

    static safeSend(send) {
        return (data) => {
            if (!(data instanceof Uint8Array)) data = Message.encode(data);
            try {
                send(data.buffer);
            } catch (e) {
                console.error(e);
            }
        };
    }
    static str2ab(str) {
        let buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
        let bufView = new Uint16Array(buf);
        for (let i = 0, strLen = str.length; i < strLen; i++) {
            bufView[i] = str.charCodeAt(i);
        }
        return buf;
    }

    static ab2str(buf) {
        return String.fromCharCode.apply(null, new Uint16Array(buf));
    }
}

/** @type {{ JOIN: 0, CONNECT: 1, STATE: 2 }} */
Message.type = new Enum(['JOIN', 'CONNECT', 'STATE']);


export default Message;
