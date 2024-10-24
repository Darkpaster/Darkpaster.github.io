import { settings } from "../configs/settings.js"

export function randomString() { return Math.random().toString(36).substring(2)}

export function randomInt(min, max = 0) {
    return max > 0 ? Math.round(Math.random() * (max - min)) + min :
    Math.round(Math.random() * min); //(max)
}

export function scaledTileSize() {
    return settings.tileSize * settings.defaultTileScale;
}

export function calculateDistance(actor1, actor2) {
    return Math.sqrt(Math.pow(actor2.x - actor1.x, 2) + Math.pow(actor2.y - actor1.y, 2));
}