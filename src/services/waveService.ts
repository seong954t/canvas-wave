import WavePoint from "../utils/wavePoint";

const WAVE_POINT_SIZE = 6;
class WaveService {
    ctx: CanvasRenderingContext2D;
    width: number = 0;
    height: number = 0;
    wavePoints: WavePoint[] = [];

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    };

    resize = (width: number, height: number) => {
        this.width = width;
        this.height = height;
        this.updateWavePoints();
    };

    updateWavePoints = () => {
        const positionX = this.width / (WAVE_POINT_SIZE - 1);
        const positionY = this.height / 2;
        const tempWavePoints: WavePoint[] = [];

        for (let i = 0; i < WAVE_POINT_SIZE; i++) {
            tempWavePoints.push(new WavePoint(i, positionX * i, positionY));
        }

        this.wavePoints = tempWavePoints;
    };

    animate = () => {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.wavePoints.forEach((wavePoint) => wavePoint.draw(this.ctx));
        requestAnimationFrame(this.animate.bind(this));
    };
}


export default WaveService;