import { scaledTileSize } from "../utils.js";

export class Camera {
    constructor(x, y, canvas) {
        canvas.translate(-x + window.innerWidth / 2 - scaledTileSize(), -y + window.innerHeight / 2 - scaledTileSize());
        this.canvas = canvas;
    }

    update(diff, location, x, y) {
        this.canvas.translate(diff.x, diff.y);
        if(location.length * scaledTileSize() < y || y < 0) {
            this.canvas.translate(0, -diff.y);
        }
        if (location[0].length * scaledTileSize() < x || x < 0) {
            this.canvas.translate(-diff.x, 0);
        }
    }
}

