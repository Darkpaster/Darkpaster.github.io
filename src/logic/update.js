import { settings } from "../configs/settings.js";
import { canvas } from "../graphics/graphics.js";
import { Camera } from "../ui/camera.js";
import { updateInGameUI } from "../ui/components.js";
import { scaledTileSize } from "../utils/math.js";
import { Delay } from "../utils/time.js";
import { Player } from "./actors/mainCharacter.js";
import { blueWitch } from "./actors/mobs/blueWitch.js";
import { Mob } from "./actors/mobs/mob.js";
import { Slash } from "./skills/slash.js";
import { setCurrentLocation } from "./world/locationList.js";

const updateRate = new Delay(Math.round(100 / settings.delay()));

export let player = null,
    camera = null;

export function init() {
    setCurrentLocation("spawn");
    player = new Player();
    camera = new Camera(player.x, player.y);
    player.learn(new Slash());
    new blueWitch();
}

export function update() {
    if (updateRate.timeIsUp()) {
        camera.update(player.updatePlayer(), player.x, player.y);
        updateInGameUI();
        for (const mob of Mob.mobList) {
            mob.update();
        }
        // Actor.actorList = Actor.actorList.filter((actor) => actor.isAlive());
    }
    if (canvas.id !== document.activeElement.id){
        canvas.focus();
    }
}

export function updateZoom(zoomIn) {
    const prevPosX = player.getTileX();
    const prevPosY = player.getTileY();
    const prevPos = [];
    for (const mob of Mob.mobList) {
        prevPos.push({ x: mob.getTileX(), y: mob.getTileY() });
    }

    settings.defaultTileScale += zoomIn ? 1 : -1;

    const offsetX = prevPosX * scaledTileSize();
    const offsetY = prevPosY * scaledTileSize();
    
    camera.update(player.updatePlayer(offsetX, offsetY), player.x, player.y);
    player.image.update(zoomIn ? 1 : -1);

    for (let i = 0; i < Mob.mobList.length; i++) {
        const mob = Mob.mobList[i];
        const offsetX = prevPos[i].x * scaledTileSize();
        const offsetY = prevPos[i].y * scaledTileSize();
        mob.image.update(zoomIn ? 1 : -1);
        mob.update(offsetX, offsetY);
    }
}