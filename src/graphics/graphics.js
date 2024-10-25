import { pauseMusic, playMusic } from "../audio/music.js";
import { createButton } from "../ui/components/button.js";
import { Win } from "../ui/components/window.js";
import { scaledTileSize } from "../utils/math.js";
import { backgroundSheet3 } from "./sprites.js";
import { tiles } from "./tileSprites.js";
import { getCurrentLocation } from "../logic/world/locationList.js";
import { player } from "../logic/update.js";
import { Mob } from "../logic/actors/mobs/mob.js";

export const canvas = document.getElementById("canvas"),
    play = createButton("start");
canvas.width = getCurrentLocation().floor.length * scaledTileSize();
canvas.height = getCurrentLocation().floor[0].length * scaledTileSize();
export const graphics = canvas.getContext("2d");
const menu = document.getElementById("menu"),
    mainMenu = new Win("menuDiv", play, createButton("bestiary"),
        createButton("settings"), createButton("main menu")),
    title = document.getElementById("title");

const f = new FontFace("pixel", "url(src/assets/fonts/Planes_ValMore.ttf)");
f.load().then(() => {
    document.fonts.add(f);
    graphics.font = "30px pixel";
});
graphics.fillStyle = "black";
menu.appendChild(mainMenu.element);

document.getElementById("start").onclick = (event) => {
    event.target.remove();
    document.getElementById("root").style.display = "flex";
    canvas.style.display = "block";
    // playMusic("main");
};

export function showMenu() {
    // pauseMusic();
    title.style.display = menu.style.display = "block";
    setBlur(true);
};

export function hideMenu() {
    // playMusic("garden", false);
    setBlur(false);
    title.style.display = menu.style.display = "none";
}

export function render() {
    graphics.fillRect(-1000, -1000, canvas.width + 2000, canvas.height + 2000);
    renderTilemap();
    renderActors();
}

function setBlur(set) {
    canvas.style.filter = set ? "blur(5px)" : "none";
}

function renderActors() {
    player.image.render(player.renderState, graphics, player.x, player.y, player.direction);
    // graphics.fillText(player.health, player.x, player.y);
    graphics.fillRect(player.x, player.y, 5, 5);
    Mob.mobList.forEach(mob => {
        mob.image.render(mob.renderState, graphics, mob.x, mob.y, mob.direction);
        // graphics.fillText(mob.health, mob.x, mob.y);
        graphics.fillRect(mob.x, mob.y, 5, 5);
    });
}

function renderTilemap() {
    const tilesY = Math.round(window.innerHeight / scaledTileSize() / 2) + 2;
    const tilesX = Math.round(window.innerWidth / scaledTileSize() / 2) + 2;
    const beforeY = player.getTileY() - tilesY;
    const afterY = player.getTileY() + tilesY;
    const beforeX = player.getTileX() - tilesX;
    const afterX = player.getTileX() + tilesX;
    for (let i = beforeY; i < afterY; i++) {
        for (let j = beforeX; j < afterX; j++) {
            const tile = getCurrentLocation().floor[i][j];
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