import { tiles } from "../../../graphics/tileSprites.js";
import { calcDistance, calcDistanceX, calcDistanceY, randomInt, scaledTileSize } from "../../../utils/math.js";
import { TimeDelay } from "../../../utils/time.js";
import { player } from "../../update.js";
import { getCurrentLocation } from "../../world/locationList.js";

import { Actor } from "../actor.js";

export class Mob extends Actor {
    static mobList = [];
    static states = {
        WANDERING: "wandering",
        CHASING: "chasing",
        FLEEING: "fleeing"
    }


    constructor() {
        super();
        this.state = Mob.states.WANDERING;
        this.timer = new TimeDelay(1000);
        this.idle = true;
        this._agroRadius = 5;
        Mob.mobList.push(this);
    }

    get agroRadius() {
        return scaledTileSize() * this._agroRadius;
    }

    set agroRadius(r) {
        this._agroRadius = r;
    }

    static getMobsOnTile(x, y) {
        const result = []
        for (const mob of Mob.mobList) {
            if (mob.getPosX() === Math.floor(x / scaledTileSize())
                && mob.getPosY() === Math.floor(y / scaledTileSize())) {
                result.push(mob);
            }
        }
        return result
    }

    update() {
        const scaledTile = scaledTileSize();

        let cnt = false;

        if (this.x % scaledTile !== 0) {
            this.x -= this.offsetX;
            cnt = true;
        }
        if (this.y % scaledTile !== 0) {
            this.y -= this.offsetY;
            cnt = true;
        }

        if (cnt) {
            return { x: this.offsetX, y: this.offsetY }
        }

        const diff = { x: this.x, y: this.y };

        this.setState();
        this.events();

        const tempDiffX = diff.x - this.x;
        const tempDiffY = diff.y - this.y;

        if (tempDiffX < 0) {
            this.nextPosX = this.getPosX() + 1;
        } else {
            this.nextPosX = this.getPosX();
        }
        if (tempDiffY < 0) {
            this.nextPosY = this.getPosY() + 1;
        } else {
            this.nextPosY = this.getPosY();
        }

        const collision = this.collision(Mob.mobList);
        if (collision.x) {
            this.x = diff.x;
            this.nextPosX = this.getPosX();
        }
        if (collision.y) {
            this.y = diff.y;
            this.nextPosY = this.getPosY();
        }

        this.offsetX = diff.x = diff.x - this.x;
        this.offsetY = diff.y = diff.y - this.y;

        return diff;
    }

    // #testCollision() {
    //     const rtrn = false;
    //     const collision = this.collision(Mob.mobList);
    //     if (collision.x) {
    //         this.x = diff.x;
    //         rtrn = true;
    //     }
    //     if (collision.y) {
    //         this.y = diff.y;
    //         rtrn = true;
    //     }
    //     return rtrn;
    // }

    setState() {
        if (calcDistance(player, this) < this.agroRadius) {
            // if(this.checkVisibility) {
            this.state = Mob.states.CHASING;
            this.target = player;
            // }
        } else {
            this.state = Mob.states.WANDERING;
            this.target = null;
        }
    }

    checkVisibility() {
        const directPath = this.getDirectPathTiles();

        return directPath.every((value) => value.walkable);
    }

    events() {
        if (this.state === Mob.states.CHASING) {
            if (!this.attackEvents()) {
                this.chase();
            }
        } else if (this.state === Mob.states.WANDERING) {
            this.wander();
        } else if (this.state === Mob.states.FLEEING) {
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
        const ray = { x: player.x, y: player.y }
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
            } else {
                ray.x -= offsetX;
            }
            if (pY) {
                ray.y += offsetY;
            } else {
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

    spellEvents() {
        let success = false;
        for (const spell of this.spellBook) {
            success = spell.useSkill(this, player);
        }
        return success;
    }

    dealDamage(damage) {
        super.dealDamage(damage);
        if (this.HP <= 0) {
            this.die();
            player.target = null;
        }
    }


    die() {
        Mob.mobList.splice(Mob.mobList.indexOf(this), 1);
    }

}
