interface options {
    speed?: number;
    height?: number;
}

const DEFAULT_OPTIONS = {
    speed: 0.1,
    height: 150
};

class WavePoint {
    x: number;
    y: number;
    private fixedY: number;
    private sinX: number;
    private options: options;

    constructor(index: number, x: number, y: number, options: options = DEFAULT_OPTIONS) {
        this.x = x;
        this.y = y;
        this.fixedY = y;
        this.options = options;
        this.sinX = index;
    };

    private update = () => {
        const {
            speed = DEFAULT_OPTIONS.speed,
            height = DEFAULT_OPTIONS.height
        } = this.options;

        this.sinX += speed;
        this.y = this.fixedY + (Math.sin(this.sinX) * height);
    };

    draw = (ctx: CanvasRenderingContext2D) => {
        this.update();
        ctx.beginPath();
        ctx.fillStyle = 'red';
        ctx.arc(this.x, this.y, 30, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    };
}

export default WavePoint;