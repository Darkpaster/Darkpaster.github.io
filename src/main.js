import { settings } from "./configs/settings.js";
import { hideMenu, play, render, showMenu } from "./graphics/graphics.js";
import { pressPause } from "./io/input.js";
import { init, update } from "./logic/update.js";

export let gameState = "menu";


init();

play.onclick = () => {
    hideMenu();
    gameState = "playing";
    const mainLoop = setInterval(() => {
        update();
        render();
        if (pressPause) {
            showMenu();
            gameState = "paused";
            clearInterval(mainLoop);
        }
    }, settings.delay());
};