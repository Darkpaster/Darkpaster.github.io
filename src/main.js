import { Player } from "./actors/character.js";
import settings from "./configs/settings.js";
import { gameWindow, render } from "./graphics/graphics.js";
import { pressPause } from "./io.js";
// import * as say from './say.js';
export let gameState = "menu";
settings.fps = 30;

export const player = new Player();
// const enemy = new Enemy("Enemy");

export const play = document.getElementById("play");
const menuWindow = document.getElementById("menu"),
    title = document.getElementById("title"),
    mainTheme = new Audio('./src/assets/sounds/music/RelaxingGreenNature.mp3'),
    sacredGarden = new Audio('./src/assets/sounds/music/sacred-garden.mp3');

sacredGarden.volume = 0.5;
mainTheme.loop = sacredGarden.loop = true;
document.getElementById("start").onclick = (event) => {
    event.target.remove();
    document.getElementById("root").style.display = "flex";
    gameWindow.style.display = "block";
    mainTheme.play();
};


play.addEventListener("click", () => {
    mainTheme.pause();
    sacredGarden.play();
    title.style.display = menuWindow.style.display = "none";
    gameState = "playing";
    const game = setInterval(() => {
        player.update();
        render();
        if (pressPause) {
            sacredGarden.pause();
            title.style.display = menuWindow.style.display = "block";
            clearInterval(game);
            gameState = "paused";
        }
    }, settings.fps);
});