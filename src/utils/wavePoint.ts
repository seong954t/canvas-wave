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
    private sinX: number;
    private readonly fixedY: number;
    private readonly options: options;

    constructor(index: number, x: number, y: number, options: options = DEFAULT_OPTIONS) {
        this.x = x;
        this.y = y;
        this.fixedY = y;
        this.options = options;
        this.sinX = index;
    };

    update = () => {
        const {
            speed = DEFAULT_OPTIONS.speed,
            height = DEFAULT_OPTIONS.height
        } = this.options;

        this.sinX += speed;
        this.y = this.fixedY + (Math.sin(this.sinX) * height);
    };
}

export default WavePoint;
