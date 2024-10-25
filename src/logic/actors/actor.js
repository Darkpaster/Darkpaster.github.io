import { settings } from "../../configs/settings.js";
import { randomInt, scaledTileSize } from "../../utils/math.js";
import { TimeDelay } from "../../utils/time.js";
import { getCurrentLocation } from "../world/locationList.js";

export class Actor {
	constructor() {
		this.name = "Unknown";
		this.x = getCurrentLocation().floor[0].length * scaledTileSize() / 2;
		this.y = getCurrentLocation().floor.length * scaledTileSize() / 2;
		this.health = 100,
		this.maxHealth = 100,
		this.maxDamage = 5;
		this.minDamage = 2;
		this.mana = 0,
		this.maxMana = 0,
		this.defense = 0,
		this.magicDefense = 0,
		this.accuracy = 0,
		this.evasion = 0,
		this.criticalChance = 0,
		this.criticalDamage = 2,
		this._moveSpeed = 3;
		this.image = null;
		this.attackDelay = new TimeDelay(1500, true);
		this.castDelay = new TimeDelay(500);
		this.attackRange = 10;
		this.renderState = "idle";
		this.direction = "down";
	}
	get moveSpeed() {
		return Math.round(this._moveSpeed * settings.defaultTileScale);
	}

	set moveSpeed(value) {
		this._moveSpeed = value;
	}

	getTileX(){
		return Math.round(this.x / scaledTileSize());
	}
	getTileY(){
		return Math.round(this.y / scaledTileSize());
	}

	dealDamage(damage) {
		const realDamage = damage - this.defense;
		if (realDamage < 0) {
			return;
		}
		this.health -= damage;
		if (this.health <= 0) {
			this.die();
		}
	}




	// _checkCollisison(x, y) {
	// 	const tile = currentLocation.floor[Math.floor(y / scaledTileSize())][Math.floor(x / scaledTileSize())];
	// 	if (tile.solid) {
	// 		return true;
	// 	}
	// 	return false;
	// }
}