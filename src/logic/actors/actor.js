import { settings } from "../../configs/settings.js";
import { FloatText } from "../../graphics/floatText.js";
import { floatTextList } from "../../graphics/graphics.js";
import { getActorTile, getTile, getWallTile } from "../../graphics/tileSprites.js";
import { calcDistance, randomInt, scaledTileSize } from "../../utils/math.js";
import { TimeDelay } from "../../utils/time.js";
import { getCurrentLocation } from "../world/locationList.js";
import { Player } from "./player.js";

export class Actor {
	constructor() {
		this.name = "Unknown";
		this.x = getCurrentLocation().floor[0].length / 2 * scaledTileSize();
		this.y = getCurrentLocation().floor.length / 2 * scaledTileSize();
		this.offsetX = 0;
		this.offsetY = 0;
		this.nextPosX;
		this.nextPosY;
		this.HP = 100;
		this.HT = 100;
		this.HR = 1;
		this.maxDamage = 5;
		this.minDamage = 2;
		this.mana = 0;
		this.maxMana = 0;
		this.defense = 0;
		this.magicDefense = 0;
		this.accuracy = 0;
		this.evasion = 0;
		this.criticalChance = 0.05;
		this.criticalDamage = 2;
		this._moveSpeed = 2;
		this.image = null;
		this.attackDelay = new TimeDelay(2000, true);
		this.attackRange = 1;
		this.renderState = "idle";
		this.direction = "down";
		this.target = null;
	}
	get moveSpeed() {
		return Math.round(this._moveSpeed * settings.defaultTileScale);
	}

	set moveSpeed(value) {
		this._moveSpeed = value;
	}

	getPosX() {
		return Math.floor(this.x / scaledTileSize());
	}
	getPosY() {
		return Math.floor(this.y / scaledTileSize());
	}

	setCoordinates(x, y) {
		const result = { x: this.x, y: this.y }
		this.x = x;
		this.y = y;
		result.x -= this.x;
		result.y -= this.y;
		return result
	}

	dealDamage(damage, source = null) {
		let realDamage = damage;
		let crit = false;
		if (source) {
			if (source.criticalChance > Math.random()) {
				realDamage *= source.criticalDamage;
				crit = true;
			}
		}
		realDamage -= this.defense;
		if (realDamage < 0) {
			realDamage = 0;
		}
		this.HP -= realDamage;
		floatTextList.push(new FloatText(realDamage, this.x, this.y, this instanceof Player ? "red" : "orange", crit));
	}

	heal(value) {
		const realValue = Math.min(value, this.HT - this.HP);
        this.HP += realValue;
        floatTextList.push(new FloatText(value, this.x, this.y, "green"));
	}

	autoAttack() {
		if (this.attackDelay.timeIsUp()) {
			this.target.dealDamage(randomInt(this.minDamage, this.maxDamage), this);
		}
	}

	inRangeOfAttack() {
        return calcDistance(this.target, this) < scaledTileSize() * this.attackRange * 1.5;
    }

    attackEvents() {
		if (this.target == null) {
			// console.log(123);
			return false
		}
        if (this.inRangeOfAttack()) {
			// this.renderState = "attack";
            this.autoAttack();
            return true
        }
        return false
    }

	getPosTile() {
		return getActorTile(this);
	}

	collision(mobs) {
		const stop = { x: false, y: false };


		// for (const mob of mobs) {
		// 	if (this === mob) {
		// 		continue
		// 	}
		// 	if (mob.nextPosX === this.nextPosX && mob.nextPosY === this.nextPosY) {
		// 		stop.x = stop.y = true;
		// 	}
		// }

		if (!getWallTile(this.nextPosX, this.nextPosY).props.isWalkable) {
			stop.x = stop.y = true;
		}

		return stop
	}
}
