import { hideCanvas, setBlur, showCanvas } from "../graphics/graphics.js";
import { player } from "../logic/update.js";
import { game, pauseLoop } from "../main.js";
import { createButton } from "./dom/button.js";
import { createProgressBar } from "./dom/progressBar.js";
import { Win } from "./dom/window.js";

const menu = document.getElementById("menu"),
    root = document.getElementById("root"),
    inventoryCells = [],
    title = document.getElementById("title");



const mainMenu = new Win("menuDiv", createButton("start", () => {
    mainMenu.hide();
    title.style.display = "none";
    showCanvas();
    game();
}), createButton("bestiary"),
    createButton("shortcuts"), createButton("settings"));



const pauseMenu = new Win("menuDiv", createButton("resume", () => {
    if (pauseMenu.isHidden()) {
        pauseLoop();
        pauseMenu.show();
        setBlur(true);
        title.style.display = "block";
    } else {
        pauseMenu.hide();
        title.style.display = "none";
        setBlur(false);
        game();
    }
}), createButton("shortcuts", () => {

}), createButton("settings", () => {

}), createButton("main menu", () => {
    setBlur(false);
    pauseLoop();
    hideCanvas();
    title.style.display = "block";
    pauseMenu.hide();
    mainMenu.show();
}));






// const mana = createProgressBar("mana", player.mana, player.m);


const inventory = new Win("inventoryDiv", createButton("open close inventory", () => {
    if (inventory.isHidden()) {
        inventory.show();
    } else {
        inventory.hide();
    }
}, "hidden")),
    health = createProgressBar("health", "stat-bar", 100, 1000);
    health.style.accentColor = "green";
    health.style.backgroundColor = "grey";

for (let i = 0; i < 200; i++) {
    inventory.element.appendChild(createButton(`item ${i}`, null, "cell"));
}


export function updateInGameUI() {
    health.value = player.health;
    health.maxValue = player.maxHealth;
    // inventoryCells.forEach((cell, index) => {
    //     cell.innerHTML = player.inventory[index] ? player.inventory[index].name : "";
    // });
}

export function initComponents() {
    pauseMenu.hide();
    inventory.hide();
    menu.appendChild(mainMenu.element);
    menu.appendChild(pauseMenu.element);
    root.appendChild(inventory.element);
    root.appendChild(health);
}


export function clickAt(button) {
    document.getElementById(button).click();
}
