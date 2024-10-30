import { TimeDelay } from "../utils/time.js";


export class FloatText {
    constructor(text, x, y, color) {
        this.x = x;
        this.y = y;
        this.text = text;
        this.lifeTime = new TimeDelay(1500);
        this.fillStyle = color;
    }

    render(ctx) {
        ctx.fillStyle = this.fillStyle;
        ctx.fillText(this.text, this.x, this.y);
    }

    update() {
        this.y--;

        if (this.lifeTime.timeIsUp()) {
            return true;
        }
        return false;
    }

}