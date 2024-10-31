import { settings } from "../configs/settings.js"

export function randomString(...strings) {
    return strings[Math.floor(Math.random() * strings.length)];
}

export function randomInt(min, max = 0) {
    return max > 0 ? Math.round(Math.random() * (max - min)) + min :
    Math.round(Math.random() * min); //(max)
}

export function scaledTileSize() {
    return settings.tileSize * settings.defaultTileScale;
}

export function calcDistance(entity1, entity2) {
    return Math.sqrt(Math.pow(entity2.x - entity1.x, 2) + Math.pow(entity2.y - entity1.y, 2));
}

export function calcDistanceX(entity1, entity2) {
    return Math.abs(entity1.x - entity2.x);
}
export function calcDistanceY(entity1, entity2) {
    return Math.abs(entity1.y - entity2.y);
}