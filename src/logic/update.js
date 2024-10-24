import { settings } from "../configs/settings.js";
import { Camera } from "../ui/camera.js";
import { Delay } from "../utils/time.js";
import { Actor } from "./actors/actor.js";
import { Player } from "./actors/mainCharacter.js";
import { blueWitch } from "./actors/mobs/blueWitch.js";
import { Slash } from "./skills/slash.js";
import { setCurrentLocation } from "./world/locationList.js";

const updateRate = new Delay(Math.round(100 / settings.delay()));

export let player = null;
let camera = null;

export function init() {
    setCurrentLocation("spawn");
    player = new Player();
    camera = new Camera(player.x, player.y);
    player.learn(new Slash());
    new blueWitch();
}

export function update() {
    if (updateRate.timeIsUp()) {
        camera.update(player.update(), player.x, player.y);
        Actor.actorList.forEach((actor) => {
            actor.update();
        });
        // Actor.actorList = Actor.actorList.filter((actor) => actor.isAlive());
        
    }
}