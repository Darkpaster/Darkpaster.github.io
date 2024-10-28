import { settings } from "./configs/settings.js";
import { render } from "./graphics/graphics.js";
import { init, update } from "./logic/update.js";
import { initComponents } from "./ui/components.js";

export let gameState = "menu";

init();

initComponents();

let mainLoop = null;
export function game(){
    gameState = "playing";
    mainLoop = setInterval(() => {
        update();
        render();
    }, settings.delay());
};

export function pauseLoop() {
    gameState = "paused";
    clearInterval(mainLoop);
}

