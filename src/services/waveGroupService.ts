import Wave, {IWaveOption} from "../utils/wave";


class WaveGroupService {
    ctx: CanvasRenderingContext2D;
    width: number = 0;
    height: number = 0;
    waveCount: number = 0;
    waves: Wave[] = [];
    options?: IWaveOption[];

    constructor(ctx: CanvasRenderingContext2D, waveCount: number, options?: IWaveOption[]) {
        this.ctx = ctx;
        this.waveCount = waveCount;
        this.options = options;
    };

    resize = (width: number, height: number) => {
        this.width = width;
        this.height = height;
        this.updateWave();
    };

    updateWave = () => {
        this.waves = [];
        for (let i = 0; i < this.waveCount; i++) {
            this.waves.push(new Wave(this.width, this.height, this.options && this.options[i]));
        }
    };

    animate = () => {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.waves.forEach((wave) => wave.draw(this.ctx));
        requestAnimationFrame(this.animate.bind(this));
    };
}


export default WaveGroupService;