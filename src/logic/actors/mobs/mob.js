import { calculateDistance, randomInt, randomString, scaledTileSize } from "../../../utils/math.js";
import { TimeDelay } from "../../../utils/time.js";
import { player } from "../../update.js";
import { getCurrentLocation } from "../../world/locationList.js";
import { Actor } from "../actor.js";


export class Mob extends Actor {
    static mobList = [];
    constructor() {
        super();
        this.state = "wondering";
        this.timer = new TimeDelay(1000);
        this.idle = true;
        this.agroRadius = scaledTileSize() * 8;
        Mob.mobList.push(this);
    }

    update(x = 0, y = 0) {
        const diff = { x: this.x, y: this.y };


        if (calculateDistance(player, this) < this.agroRadius) {
            this.state = "chasing";
            this.target = player;
        } else {
            this.state = "wondering";
            this.target = null;
        }

        if (this.state === "chasing") {
            
            if(!this.attackEvents()) {
                this.chase();
            }
        } else if (this.state === "wondering") {
            this.wander();
        } else if (this.state === "fleeing") {
            this.flee();
        }
        if (x !== 0) {
            this.x = x;
        }
        if (y !== 0) {
            this.y = y;
        }

        if (getCurrentLocation().floor.length * scaledTileSize() < this.y || this.y < 0) {
            this.y = diff.y;
        }
        if (getCurrentLocation().floor[0].length * scaledTileSize() < this.x || this.x < 0) {
            this.x = diff.x;
        }
        diff.x -= this.x;
        diff.y -= this.y;

        if (diff.x !== 0 || diff.y !== 0) {
            this.renderState = "walk";
        } else {
            if(this.renderState === "idle"){
                this.renderState = "idle";
            }

        }

        return diff;
    }

    chase() {
        const dist1 = player.x - scaledTileSize() * 2,
            dist2 = player.x + scaledTileSize() * 2,
            dist3 = player.y - scaledTileSize() * 2,
            dist4 = player.y + scaledTileSize() * 2;
        if (this.x < dist1) {
            this.x += Math.min(this.moveSpeed, dist1 - this.x);
            this.direction = "right";
        } else if (this.x > dist2) {
            this.x -= Math.min(this.moveSpeed, dist2 - player.x);
            this.direction = "left";
        }
        if (this.y < dist3) {
            this.y += Math.min(this.moveSpeed, dist3 - this.y);
            this.direction = "down";
        } else if (this.y > dist4) {
            this.y -= Math.min(this.moveSpeed, dist4 - player.y);
            this.direction = "up";
        }
    }
    wander() {
        let direction = randomString("right", "left", "down", "up");
        if (!this.timer.timeIsUp()) {
            direction = this.direction;
            // this.timer.setDelay(randomInt(1000, 3000));
        } else {
            if (randomInt(1) === 1) {
                this.idle = !this.idle;
                return
            }
        }
        if (this.idle) {
            return
        }
        //  this.timer.duration = randomInt(1000, 3000);
        switch (direction) {
            case "right":
                this.x += this.moveSpeed / 2;
                this.direction = "right";
                break;
            case "left":
                this.x -= this.moveSpeed / 2;
                this.direction = "left";
                break;
            case "down":
                this.y += this.moveSpeed / 2;
                this.direction = "down";
                break;
            case "up":
                this.y -= this.moveSpeed / 2;
                this.direction = "up";
                break;
        }
    }
    flee() {
        if (this.x < player.x) {
            this.x -= this.moveSpeed;
            this.direction = "left";
        } else if (this.x > player.x) {
            this.x += this.moveSpeed;
            this.direction = "right";
        } else if (this.y < player.y) {
            this.y -= this.moveSpeed;
            this.direction = "up";
        } else if (this.y > player.y) {
            this.y += this.moveSpeed;
            this.direction = "down";
        }
    }

    attackEvents() {
        let success = false;
        for (const spell of this.spellBook) {
            success = spell.useSkill(this, player);
        }
        return success;
    }

    autoAttack() {
    }


    die() {
        Mob.mobList.splice(Mob.mobList.indexOf(this), 1);
    }

}
