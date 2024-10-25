import { AnimatedImageManager } from "./image.js";
import { blueWitchSheet, firstCharacter } from "./sprites.js";

export const heroImageManager = new AnimatedImageManager(firstCharacter);
export const blueWitchImageManager = new AnimatedImageManager(blueWitchSheet, true, false);

//hero.render(sheet, ctx, player.x, player.y);
