import { scaledTileSize } from "../utils/math.js";
import { tiles } from "./tileSprites.js";
import { getCurrentLocation } from "../logic/world/locationList.js";
import { player } from "../logic/update.js";
import { Mob } from "../logic/actors/mobs/mob.js";
import { initKeyboard } from "../io/input.js";
import { selector1 } from "./staticSprites.js";

export const canvas = document.getElementById("canvas");
initKeyboard();
export const floatTextList = [];
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
export const graphics = canvas.getContext("2d");

const f = new FontFace("pixel", "url(src/assets/fonts/Planes_ValMore.ttf)");
f.load().then(() => {
    document.fonts.add(f);
    graphics.font = "20px pixel";
});

document.getElementById("init").onclick = (event) => {
    event.target.remove();
    document.getElementById("root").style.display = "flex";
    canvas.style.display = "block";
    // playMusic("main");
};



export function render() {
    renderTilemap();
    renderActors();
    renderText();
}

export function setBlur(set) {
    canvas.style.filter = set ? "blur(5px)" : "none";
}

export function hideCanvas() {
    canvas.style.display = "none";
}
export function showCanvas() {
    canvas.style.display = "block";
    canvas.setAttribute('tabindex','0');
    canvas.focus();
}

function renderActors() {
    graphics.fillStyle = "blue";
    player.image.render(player.renderState, graphics, player.x, player.y, player.direction);
    for (const mob of Mob.mobList) {
        mob.image.render(mob.renderState, graphics, mob.x, mob.y, mob.direction);
        graphics.fillText(mob.name, mob.x, mob.y);
    }
    graphics.drawImage(selector1.tile, player.target?.x, player.target?.y, scaledTileSize(), scaledTileSize());
    graphics.fillText(player.name, player.x, player.y);
    // graphics.fillText("+", player.nextPosX * scaledTileSize() + scaledTileSize() / 3
    // , player.nextPosY * scaledTileSize() + scaledTileSize() / 2);
}

function renderText() {
    let length = floatTextList.length;
    if (!length) {
        return
    }
    while (length--) {
        const text = floatTextList[length];
        text.render(graphics);
        if(text.update()) {
            floatTextList.splice(floatTextList.indexOf(text), 1);
        }
    }
}

function renderTilemap() {
    const tilesY = Math.round(window.innerHeight / scaledTileSize() / 2) + 2;
    const tilesX = Math.round(window.innerWidth / scaledTileSize() / 2) + 2;
    const beforeY = player.getPosY() - tilesY + 2;
    const afterY = player.getPosY() + tilesY;
    const beforeX = player.getPosX() - tilesX + 2;
    const afterX = player.getPosX() + tilesX;
    graphics.fillStyle = "black";
    for (let i = beforeY; i < afterY; i++) {
        for (let j = beforeX; j < afterX; j++) {
            const tile = getCurrentLocation().floor[i][j];
            if (!tiles[tile]) {
                graphics.fillRect(j * scaledTileSize(), i * scaledTileSize(),
                scaledTileSize(), scaledTileSize());
                continue
            }
            graphics.drawImage(tiles[tile].image.tile, j * scaledTileSize(), i * scaledTileSize(),
                scaledTileSize(), scaledTileSize());
        }
    }
}