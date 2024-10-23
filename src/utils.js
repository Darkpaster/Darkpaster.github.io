import { settings } from "./configs/settings.js"

export function randomString() { return Math.random().toString(36).substring(2)}

export function scaledTileSize() {
    return settings.tileSize * settings.defaultTileScale;
}