import { graphics } from "../graphics/graphics.js";
import { getCurrentLocation } from "../logic/world/locationList.js";
import { scaledTileSize } from "../utils/math.js";

export class Camera {
    constructor(x, y) {
        graphics.translate(-x + window.innerWidth / 2 - scaledTileSize(), -y + window.innerHeight / 2 - scaledTileSize());
    }

    update(diff, x, y) {
        graphics.translate(diff.x, diff.y);
        if(getCurrentLocation().floor.length * scaledTileSize() < y || y < 0) {
            graphics.translate(0, -diff.y);
        }
        if (getCurrentLocation().floor[0].length * scaledTileSize() < x || x < 0) {
            graphics.translate(-diff.x, 0);
        }
    }
}

