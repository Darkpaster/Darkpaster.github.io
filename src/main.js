import { Player } from "./actors/character.js";
import { gameWindow, render } from "./graphics/graphics.js";
// import * as say from './say.js';

export const player = new Player();
// const enemy = new Enemy("Enemy");

setInterval(() => {
    player.update();
    render();
}, 100);
//graphics.fillText("@", width / 2, height / 2);
