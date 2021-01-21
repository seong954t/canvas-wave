import WavePoint from "./wavePoint";
import randomColor from "./randomColorUtil";

const DEFAULT_WAVE_POINT_SIZE = 6;

class Wave {
    private readonly width: number;
    private readonly height: number;
    private readonly wavePointSize: number;
    private readonly wavePoints: WavePoint[];
    private readonly defaultFillStyle: string = randomColor();

    constructor(width: number, height: number, interval: number = DEFAULT_WAVE_POINT_SIZE) {
        this.width = width;
        this.height = height;
        this.wavePointSize = Math.max(interval, 2);
        this.wavePoints = this.createWavePoints(this.wavePointSize);
        console.log(this.wavePoints);
    }

    private createWavePoints = (size: number): WavePoint[] => {
        const interval = this.width / (size - 1);
        const positionY = this.height / 2;
        return (
            [...Array(size)].map((_, index) => (
                new WavePoint(index, interval * index, positionY)
            ))
        );
    };

    draw = (ctx: CanvasRenderingContext2D, fillStyle: string = this.defaultFillStyle) => {
        let prevX = this.wavePoints[0].x;
        let prevY = this.wavePoints[0].y;
        ctx.beginPath();
        ctx.fillStyle = fillStyle;

        this.wavePoints.forEach((wavePoint, index) => {
            if (index === 0) {
                ctx.moveTo(wavePoint.x, wavePoint.y);
                return;
            }
            if (index !== this.wavePoints.length - 1) {
                wavePoint.update();
            }
            const cx = (prevX + wavePoint.x) / 2;
            const cy = (prevY + wavePoint.y) / 2;
            ctx.quadraticCurveTo(prevX, prevY, cx, cy);
            prevX = wavePoint.x;
            prevY = wavePoint.y;
        });

        ctx.lineTo(prevX, prevY);
        ctx.lineTo(prevX, this.height);
        ctx.lineTo(this.wavePoints[0].x, this.height);
        ctx.fill();
        ctx.closePath();
    }
}

export default Wave;
