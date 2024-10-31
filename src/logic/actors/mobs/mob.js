import { tiles } from "../../../graphics/tileSprites.js";
import { calcDistance, calcDistanceX, calcDistanceY, randomInt, scaledTileSize } from "../../../utils/math.js";
import { TimeDelay } from "../../../utils/time.js";
import { player } from "../../update.js";
import { getCurrentLocation } from "../../world/locationList.js";

import { Actor } from "../actor.js";

export class Mob extends Actor {
    static mobList = [];

    #offsetX = 0;
    #offsetY = 0;
    constructor() {
        super();
        this.state = "wondering";
        this.timer = new TimeDelay(1000);
        this.idle = true;
        this._agroRadius = 6;
        Mob.mobList.push(this);
    }

    get agroRadius() {
        return scaledTileSize() * this._agroRadius;
    }

    set agroRadius(r) {
        this._agroRadius = r;
    }

    update() {
        const scaledTile = scaledTileSize();

        let cnt = false;

        if (this.x % scaledTile !== 0) {
            this.x -= this.#offsetX;
            cnt = true;
        }
        if (this.y % scaledTile !== 0) {
            this.y -= this.#offsetY;
            cnt = true;
        }

        if (cnt) {
            return { x: this.#offsetX, y: this.#offsetY }
        }

        const diff = { x: this.x, y: this.y };

        this.setState();
        this.events();

        const collision = this.collision(Mob.mobList);
		if (collision.x) {
			this.x = diff.x;
		}
		if (collision.y) {
			this.y = diff.y;
		}

        this.#offsetX = diff.x = diff.x - this.x;
        this.#offsetY = diff.y = diff.y - this.y;

        return diff;
    }

    setState() {
        if (calcDistance(player, this) < this.agroRadius) {
            // if(this.checkVisibility) {
                this.state = "chasing";
                this.target = player;
            // }
        } else {
            this.state = "wondering";
            this.target = null;
        }
    }

    checkVisibility() {
        const directPath = this.getDirectPathTiles();

        return directPath.every((value) => value.walkable);
    }

    events() {
        if (this.state === "chasing") {
            if (!this.attackEvents()) {
                this.chase();
            }
        } else if (this.state === "wondering") {
            this.wander();
        } else if (this.state === "fleeing") {
            this.flee();
        }
    }


    chase() {
        if (player.x - this.x > 0) {
            this.x += this.moveSpeed;
            this.direction = "right";
        } else if (player.x - this.x < 0) {
            this.x -= this.moveSpeed;
            this.direction = "left";
        }
        if (player.y - this.y > 0) {
            this.y += this.moveSpeed;
        } else if (player.y - this.y < 0) {
            this.y -= this.moveSpeed;
        }
    }

    calcPath() {

    }

    getDirectPathTiles() {
        const ray = {x: player.x, y: player.y}
        const tilesNum = Math.floor(calcDistance(player, this) / scaledTileSize());
        const pathX = calcDistanceX(player, this);
        const pathY = calcDistanceY(player, this);
        const offsetX = pathX / tilesNum || 0;
        const offsetY = pathY / tilesNum || 0;
        const foundTiles = [];
        const pX = player.x - this.x < 0;
        const pY = player.y - this.y < 0;
        for (let i = 1; i <= tilesNum; i++) {
            if (pX) {
                ray.x += offsetX;
            }else {
                ray.x -= offsetX;
            }
            if (pY) {
                ray.y += offsetY;
            }else {
                ray.y -= offsetY;
            }
            const tileX = Math.floor(ray.x / scaledTileSize());
            const tileY = Math.floor(ray.y / scaledTileSize());
            // alert(getCurrentLocation().floor[tileY][tileX]);
            foundTiles.push(tiles[getCurrentLocation().floor[tileY][tileX]].props);
        }
        return foundTiles;
    }

    wander() {
        let direction = randomInt(200);
        switch (direction) {
            case 0:
                this.x += this.moveSpeed / 2;
                this.direction = "right";
                break;
            case 1:
                this.x -= this.moveSpeed / 2;
                this.direction = "left";
                break;
            case 2:
                this.y += this.moveSpeed / 2;
                break;
            case 3:
                this.y -= this.moveSpeed / 2;
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
        } else if (this.y > player.y) {
            this.y += this.moveSpeed;
        }
    }

    inRangeOfAttack(target = player) {
        return calcDistance(target, this) < scaledTileSize() * this.attackRange * 1.5;
    }

    attackEvents() {
        if (this.inRangeOfAttack()){
        this.autoAttack();
        return true
        }
        return false
    }

    spellEvents() {
        let success = false;
        for (const spell of this.spellBook) {
            success = spell.useSkill(this, player);
        }
        return success;
    }

    autoAttack() {
        if (this.attackDelay.timeIsUp()) {
            player.dealDamage(randomInt(this.minDamage, this.maxDamage));
        }
    }


    die() {
        Mob.mobList.splice(Mob.mobList.indexOf(this), 1);
    }

}
