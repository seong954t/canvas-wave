import Wave from "../utils/wave";

class WaveService {
    ctx: CanvasRenderingContext2D;
    width: number = 0;
    height: number = 0;
    wave: Wave = new Wave(0, 0);

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    };

    resize = (width: number, height: number) => {
        this.width = width;
        this.height = height;
        this.updateWave();
    };

    updateWave = () => {
        this.wave = new Wave(this.width, this.height, 12);
    };

    animate = () => {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.wave.draw(this.ctx);
        requestAnimationFrame(this.animate.bind(this));
    };
}


export default WaveService;