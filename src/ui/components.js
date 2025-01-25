import { canvas, hideCanvas, setBlur, showCanvas } from "../graphics/graphics.js";
import { player } from "../logic/update.js";
import { game, pauseLoop } from "../main.js";
import { createButton } from "./dom/button.js";
import { createProgressBar } from "./dom/progressBar.js";
import { Win } from "./dom/window.js";

const menu = document.getElementById("menu"),
    itemInfo = new Win("item-info"),
    root = document.getElementById("root"),
    title = document.getElementById("title"),

    mainMenu = new Win("menuDiv", createButton("new game", () => {
        gameInit();
    }), createButton("load game"),
        createButton("shortcuts"), createButton("settings")),
    pauseMenu = new Win("menuDiv", createButton("resume", () => {
        onPauseResume(pauseMenu.isHidden());
    }), createButton("save", () => {

    }), createButton("shortcuts", () => {

    }), createButton("settings", () => {

    }), createButton("main menu", () => {
        onMainMenu();
    })),
    inventory = new Win("inventory-div", createButton("open close inventory", () => {
        if (inventory.isHidden()) {
            inventory.show();
        } else {
            inventory.hide();
        }
    }, "hidden")),
    panel = new Win("panel-div"),
    health = createProgressBar("health", "stat-bar", 1000, 1000),
    targetHealth = createProgressBar("target-health", "stat-bar-enemy", 100, 100);
health.style.accentColor = "green";
targetHealth.style.accentColor = "green";
health.style.backgroundColor = "grey";
targetHealth.style.backgroundColor = "grey";


function updateInventory() {
    const items = inventory.element.children;
    for (let i = 0; i < player.inventory.length; i++) {
        const item = items.item(i + 1);
        const hasItem = Boolean(player.inventory[i]);
        const wasItem = item.textContent === " ";
        if (hasItem === wasItem) {
            continue
        }
        if (hasItem) {
            const realItem = player.inventory[i];
            item.textContent = " ";
            item.style.cursor = "pointer";
            item.style.backgroundImage = `url(${realItem.spritePath})`;
            item.style.borderColor = getRarityColor(realItem.rarity);
            item.onmouseenter = () => {
                createInfoWindow(realItem, item);
            };
            item.onmouseleave = removeInfoWindow;

            item.onclick = () => {
                realItem.onUse();
                player.inventory[i] = null;
                removeInfoWindow();
            }
        } else {
            item.textContent = "";
            item.style.cursor = "default";
            item.style.backgroundImage = "";
            item.style.borderColor = "black";
            item.onmouseenter = null;
            item.onmouseleave = null;
            item.onclick = null;
        }
    }
}

function updatePanel() {
    const skills = panel.element.children;
    for (let i = 0; i < player.spellBook.length; i++) {
        const skill = skills.item(i);
        const hasSkill = Boolean(player.spellBook[i]);
        const wasSkill = skill.textContent === " ";
        if (hasSkill === wasSkill) {
            continue
        }
        if (hasSkill) {
            const realSkill = player.spellBook[i];
            skill.textContent = i + 1 + " ";
            skill.style.cursor = "pointer";
            skill.style.backgroundImage = `url(${realSkill.icon})`;
            skill.style.borderColor = "black";
            skill.onmouseenter = () => {
                createInfoWindow(realSkill, skill);
            };
            skill.onmouseleave = removeInfoWindow;

            skill.onclick = () => {
                realSkill.useSkill();
                // player.spellBook[i] = null;
                // removeInfoWindow();
            }
        } else {
            skill.textContent = i + 1;
            skill.style.cursor = "default";
            skill.style.backgroundImage = "";
            skill.style.borderColor = "black";
            skill.onmouseenter = null;
            skill.onmouseleave = null;
            skill.onclick = null;
        }
    }

}

function createInfoWindow(realItem, htmlItem) {
    const cursor = htmlItem.getBoundingClientRect();
    itemInfo.element.innerHTML = `<big class=${realItem.rarity}>${realItem.name}</big>
    <br><br>
    ${realItem.description}
    ${realItem.note && "<br><br>" + realItem.note}`;

    itemInfo.show("block");
    const width = itemInfo.element.offsetWidth;
    const height = itemInfo.element.offsetHeight / 2;

    itemInfo.element.style.left = (cursor.left - width) + 'px';
    itemInfo.element.style.top = (cursor.top - height) + 'px';
}

function removeInfoWindow() {
    itemInfo.hide();
}

function initInventory() {
    for (let i = 0; i < player.inventory.length; i++) {
        const cell = createButton(`item ${i}`, null, "cell");
        cell.textContent = "";
        inventory.element.appendChild(cell);
    }
}
function initPanel() {
    for (let i = 0; i < 10; i++) {
        const cell = createButton(`skill ${i}`, null, "cell");
        cell.textContent = i + 1;
        cell.style.height = "100%";
        panel.element.appendChild(cell);
    }
    panel.element.children.item(9).textContent = 0;
}

function getRarityColor(rarity) {
    switch (rarity) {
        case "common":
            return "grey";
        case "rare":
            return "blue";
    }
    return "white";
}


function onPauseResume(resume) {
    if (resume) {
        menu.style.display = "block";
        pauseLoop();
        pauseMenu.show();
        setBlur(true);
        blurInterface(true);
        title.style.display = "block";
        hideAllWindows();
        canvas.removeAttribute('tabindex');
    } else {
        pauseMenu.hide();
        menu.style.display = "none";
        title.style.display = "none";
        setBlur(false);
        blurInterface(false);
        canvas.setAttribute('tabindex', '0');
        game();
    }
}

function onMainMenu() {
    setBlur(false);
    blurInterface(false);
    hideInterface(true);
    pauseLoop();
    hideCanvas();
    title.style.display = "block";
    pauseMenu.hide();
    mainMenu.show();
}

function gameInit() {
    mainMenu.hide();
    menu.style.display = "none";
    title.style.display = "none";
    showCanvas();
    hideInterface(false);
    game();
}

function hideAllWindows() {
    inventory.hide();
    itemInfo.hide();
}
function hideInterface(hide) {
    health.style.display = !hide ? "block" : "none";
    targetHealth.style.display = !hide ? "block" : "none";
    if (hide) {
        panel.hide();
    } else {
        panel.show();
    }
}
function blurInterface(set) {
    health.style.filter =
        panel.element.style.filter =
        targetHealth.style.filter = set ? "blur(5px)" : "none";
}

export function updateInGameUI() {
    health.value = player.HP;
    if (!player.target) {
        targetHealth.style.display = "none";
    } else {
        targetHealth.style.display = "block";
        targetHealth.value = player.target.HP;
    }
    // targetHealth.maxValue = player.target?.HT;
    updateInventory();
    updatePanel();
}

export function initComponents() {
    pauseMenu.hide();
    menu.appendChild(mainMenu.element);
    menu.appendChild(pauseMenu.element);

    hideAllWindows();
    hideInterface(true);
    initInventory();
    initPanel();
    root.appendChild(inventory.element);
    health.maxValue = player.HT;
    targetHealth.maxValue = player.target?.HT;
    root.appendChild(health);
    root.appendChild(targetHealth);
    root.appendChild(itemInfo.element);
    root.appendChild(panel.element); // не централизованная и не обновляемая панель
}


export function clickAt(button) {
    document.getElementById(button).click();
}
