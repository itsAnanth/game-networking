export default () => {
    HTMLCanvasElement.prototype.fitCanvas = function() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
    }
}