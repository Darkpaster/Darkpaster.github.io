import { Player } from "./actors/character.js";
import { settings } from "./configs/settings.js";
import { graphics, hideMenu, play, render, showMenu } from "./graphics/graphics.js";
import { pressPause } from "./io.js";
import { Camera } from "./ui/camera.js";
export let gameState = "menu";

settings.fps = 20;

const updateRate = 10;

export const player = new Player();

const camera = new Camera(player.x, player.y, graphics);

play.onclick = () => {
    hideMenu();
    gameState = "playing";
    const mainLoop = setInterval(() => {
        camera.update(player.update(), player.location, player.x, player.y);
        render();
        if (pressPause) {
            showMenu();
            gameState = "paused";
            clearInterval(mainLoop);
        }
    }, settings.delay());
};