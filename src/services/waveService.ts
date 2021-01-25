import Wave, {IWaveOption} from "../utils/wave";
import randomColor from "../utils/randomColorUtil";

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
        const option: IWaveOption =  {
            fillStyle: randomColor(),
            waveHeights: [150, 120, 200, 60, 120, 150],
            interval: 6,
            speed: 0.1,
            startPoint: 1
        };
        this.wave = new Wave(this.width, this.height, option);
    };

    animate = () => {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.wave.draw(this.ctx);
        requestAnimationFrame(this.animate.bind(this));
    };
}


export default WaveService;