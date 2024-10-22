import { pauseMusic, playMusic } from "../audio/music.js";
import { pressAttack, pressDown, pressLeft, pressRight, pressUp } from "../io.js";
import { gameState } from "../main.js";
import { createButton } from "../ui/button.js";
import { Win } from "../ui/window.js";
import { attackFrames, idleFrames, walkFrames } from "./animations.js";
import { backgroundSheet3 } from "./sprites.js";

export const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const graphics = canvas.getContext("2d");
let f = new FontFace("pixel", "url(src/assets/fonts/Planes_ValMore.ttf)");
f.load().then(() => {
     document.fonts.add(f);
     graphics.font = "100px pixel";
});

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
    graphics.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    drawEnemies();
    drawCharacter();
}

function setBlur(set) {
    canvas.style.filter = set ? "blur(5px)" : "none";
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
        0, 0, canvas.width, canvas.height);
}