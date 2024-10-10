import { pressAttack, pressDown, pressLeft, pressRight, pressUp } from "../io.js";
import { renderHealthBar } from "../ui/indicators.js";
import { Win } from "../ui/window.js";
import { attackFrames, idleFrames, walkFrames } from "./animations.js";
import { backgroundSheet2, backgroundSheet3, charIdleSheet } from "./sprites.js";

export const gameWindow = document.getElementById("gameWindow");
gameWindow.width = window.innerWidth;
gameWindow.height = window.innerHeight;
const graphics = gameWindow.getContext("2d");


export function render() {
    graphics.clearRect(0, 0, gameWindow.width, gameWindow.height);
    drawBackground();
    drawEnemies();
    drawCharacter();
    // renderHealthBar();
}

function drawCharacter() {
    if (pressLeft) {
        walkFrames(graphics, true);
    } else if (pressRight) {
        walkFrames(graphics);
    } else if (pressUp) {
        walkFrames(graphics, false, true);
    } else if (pressDown) {
        walkFrames(graphics, false, true);
    } else if (pressAttack) {
        attackFrames(graphics);
    } else {
        idleFrames(graphics);
    }
}

function drawEnemies() {

}

function drawBackground() {
    if (!backgroundSheet3.complete) return;
    graphics.drawImage(backgroundSheet3, 0, 0, 1920, 1080,
        0, 0, gameWindow.width, gameWindow.height);
}