export interface IWavePointOptions {
    speed?: number;
    height?: number;
}

class WavePoint {
    x: number;
    y: number;
    private sinX: number;
    private readonly fixedY: number;
    private readonly speed: number;
    private readonly height: number;

    constructor(index: number, x: number, y: number, option?: IWavePointOptions) {
        this.x = x;
        this.y = y;
        this.fixedY = y;
        this.sinX = index;
        this.speed = option?.speed || 0.1;
        this.height = option?.height || 150;
    };

    update = () => {
        this.sinX += this.speed;
        this.y = this.fixedY + (Math.sin(this.sinX) * this.height);
    };
}

export default WavePoint;
