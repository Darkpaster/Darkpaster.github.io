import { settings } from "./configs/settings.js";
import { render } from "./graphics/graphics.js";
import { init, update } from "./logic/update.js";
import { initComponents } from "./ui/components.js";

let gameState = "menu";

export function getState() {
    return gameState;
}
export function setState(state) {
    gameState = state;
}

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

