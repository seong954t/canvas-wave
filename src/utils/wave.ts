import WavePoint, {IWavePointOptions} from "./wavePoint";
import randomColor from "./randomColorUtil";

export interface IWaveOption {
    fillStyle?: string;
    waveHeights?: number[];
    interval?: number;
    speed?: number;
    startPoint?: number;
}

class Wave {
    private readonly width: number;
    private readonly height: number;
    private readonly wavePointSize: number;
    private readonly wavePoints: WavePoint[];
    private readonly fillStyle: string;
    private readonly waveHeights: number[];
    private readonly speed: number;
    private readonly startPoint: number;

    constructor(width: number, height: number, option?: IWaveOption) {
        this.width = width;
        this.height = height;
        this.wavePointSize = Math.max((option?.interval || 0), 3);
        this.fillStyle = option?.fillStyle || randomColor();
        this.waveHeights = option?.waveHeights || [this.height / 4];
        this.speed = option?.speed || 0.1;
        this.startPoint = option?.startPoint || Math.floor(Math.random() * 10000);
        this.wavePoints = this.createWavePoints(this.wavePointSize);
    }

    private createWavePoints = (size: number): WavePoint[] => {
        const interval = this.width / (size - 1);
        const positionY = this.height / 2;
        const heightsLength = this.waveHeights.length;
        return (
            [...Array(size)].map((_, index) => {
                const option: IWavePointOptions = {
                    speed: this.speed,
                    height: this.waveHeights[index % heightsLength]
                };
                return new WavePoint(this.startPoint + index, interval * index, positionY, option);
            })
        );
    };

    draw = (ctx: CanvasRenderingContext2D) => {
        let prevX = this.wavePoints[0].x;
        let prevY = this.wavePoints[0].y;
        ctx.beginPath();
        ctx.fillStyle = this.fillStyle;

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
