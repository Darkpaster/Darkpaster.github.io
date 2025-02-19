import { settings } from "../configs/settings.js";
import { randomInt, scaledTileSize } from "../utils/math.js";
import { TimeDelay } from "../utils/time.js";


export class FloatText {
    constructor(text, x, y, color, crit) {
        if (crit) {
            this.x = randomInt(x - scaledTileSize() * 1, x + scaledTileSize() * 1);
            this.y = randomInt(y - scaledTileSize() * 3, y);
        }else {
            this.x = randomInt(x, x + scaledTileSize());
            this.y = randomInt(y - scaledTileSize(), y);
        }
        this.text = text;
        this.lifeTime = new TimeDelay(1500);
        this.fillStyle = color;
        this.crit = crit;
    
    }

    render(ctx) {
        ctx.fillStyle = this.fillStyle;

        if (this.crit) {
            ctx.font = 7 * settings.defaultTileScale * 2 + "px pixel";
        }
        
        ctx.fillText(this.text, this.x, this.y);

        ctx.font = 7 * settings.defaultTileScale * 1 + "px pixel";
    }

    update() {
        this.y--;
        if (this.lifeTime.timeIsUp()) {
            return true;
        }
        return false;
    }

}