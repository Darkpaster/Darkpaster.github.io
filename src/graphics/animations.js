import { AnimatedImageManager } from "./image.js";
import { playerSheets } from "./sprites.js";

const hero = new AnimatedImageManager(playerSheets);

export function renderPlayer(sheet, ctx) {
    hero.render(sheet, ctx);
}