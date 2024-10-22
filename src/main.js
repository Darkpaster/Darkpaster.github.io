import { Player } from "./actors/character.js";
import { settings } from "./configs/settings.js";
import { hideMenu, play, render, showMenu } from "./graphics/graphics.js";
import { pressPause } from "./io.js";
// import * as say from './say.js';
export let gameState = "menu";

settings.fps = 30;

export const player = new Player();
play.onclick = () => {
    hideMenu();
    gameState = "playing";
    const mainLoop = setInterval(() => {
        player.update();
        render();
        if (pressPause) {
            showMenu();
            gameState = "paused";
            clearInterval(mainLoop);
        }
    }, settings.delay());
};