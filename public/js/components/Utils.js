import Enum from "./Enum.js";

class Utils {
    static resizeCanvas(canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
}

const MessageTypes = new Enum(['JOIN', 'CONNECT', 'STATE']);

export { MessageTypes };
export default Utils;
