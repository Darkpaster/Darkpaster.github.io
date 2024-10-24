import { AnimatedImageManager } from "./image.js";
import { blueWitchSheet, playerSheets } from "./sprites.js";

export const heroImageManager = new AnimatedImageManager(playerSheets);
export const blueWitchImageManager = new AnimatedImageManager(blueWitchSheet, true, false);

//hero.render(sheet, ctx, player.x, player.y);
