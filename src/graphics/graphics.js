import { pauseMusic, playMusic } from "../audio/music.js";
import { pressAttack, pressDown, pressLeft, pressRight, pressUp } from "../io.js";
import { createButton } from "../ui/button.js";
import { Win } from "../ui/window.js";
import { scaledTileSize } from "../utils.js";
import { renderPlayer } from "./animations.js";
import { backgroundSheet3 } from "./sprites.js";
import { tiles } from "./tiles.js";
import { player } from "../main.js";
import { spawnFloor } from "../world/spawn.js";
export const canvas = document.getElementById("canvas");
canvas.width = spawnFloor.length * scaledTileSize();
canvas.height = spawnFloor[0].length * scaledTileSize();
export const graphics = canvas.getContext("2d");

let f = new FontFace("pixel", "url(src/assets/fonts/Planes_ValMore.ttf)");
f.load().then(() => {
    document.fonts.add(f);
    graphics.font = "100px pixel";
});
graphics.fillStyle = "black";

export const play = createButton("start");

const menu = document.getElementById("menu"),
    mainMenu = new Win("menuDiv", play, createButton("bestiary"),
        createButton("settings"), createButton("main menu")),
    title = document.getElementById("title");

menu.appendChild(mainMenu.element);

document.getElementById("start").onclick = (event) => {
    event.target.remove();
    document.getElementById("root").style.display = "flex";
    canvas.style.display = "block";
    playMusic("main");
};


export function showMenu() {
    pauseMusic();
    title.style.display = menu.style.display = "block";
    setBlur(true);

};

export function hideMenu() {
    playMusic("garden", false);
    setBlur(false);
    title.style.display = menu.style.display = "none";
}

export function render() {
    graphics.fillRect(-1000, -1000, canvas.width + 2000, canvas.height + 2000);
    // drawBackground();
    drawTileMap();
    drawEnemies();
    drawCharacter();
}

function setBlur(set) {
    canvas.style.filter = set ? "blur(5px)" : "none";
}

function drawCharacter() {
    if (pressLeft) {
        renderPlayer("walk", graphics);
    } else if (pressRight) {
        renderPlayer("walk", graphics);
    } else if (pressUp) {
        renderPlayer("walk", graphics);
    } else if (pressDown) {
        renderPlayer("walk", graphics);
    } else if (pressAttack) {
        renderPlayer("attack", graphics);
    } else {
        renderPlayer("idle", graphics);
    }
}

function drawEnemies() {

}

function drawTileMap() {
    for (let i = 0; i < spawnFloor.length; i++) {
        for (let j = 0; j < spawnFloor.length; j++) {
            const tile = spawnFloor[i][j];
            if (!tiles[tile]) {
                continue
            }
            graphics.drawImage(tiles[tile].image.tile, j * scaledTileSize(), i * scaledTileSize(),
                scaledTileSize(), scaledTileSize());
        }
    }
}

function drawBackground() {
    if (!backgroundSheet3.complete) return;
    graphics.drawImage(backgroundSheet3, 0, 0, 1920, 1080,
        0, 0, window.innerWidth, window.innerHeight);
}