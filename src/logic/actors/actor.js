import { settings } from "../../configs/settings.js";
import { FloatText } from "../../graphics/floatText.js";
import { floatTextList } from "../../graphics/graphics.js";
import { randomInt, scaledTileSize } from "../../utils/math.js";
import { CallbackTimer } from "../../utils/time.js";
import { getCurrentLocation } from "../world/locationList.js";
import { Player } from "./mainCharacter.js";

export class Actor {
	constructor() {
		this.name = "Unknown";
		this.x = getCurrentLocation().floor[0].length / 2 * scaledTileSize();
		this.y = getCurrentLocation().floor.length / 2 * scaledTileSize();
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
		this.attackDelay = new CallbackTimer(() => { console.log("Attack!") }, 1000);
		this.attackRange = 10;
		this.renderState = "idle";
		this.direction = "down";
		this.spellBook = [];
		this.target = null;
	}
	get moveSpeed() {
		return Math.round(this._moveSpeed * settings.defaultTileScale);
	}

	set moveSpeed(value) {
		this._moveSpeed = value;
	}

	getTileX() {
		return Math.round(this.x / scaledTileSize());
	}
	getTileY() {
		return Math.round(this.y / scaledTileSize());
	}

	dealDamage(damage) {
		const realDamage = damage - this.defense;
		if (realDamage < 0) {
			return;
		}
		this.health -= damage;
		floatTextList.push(new FloatText(damage, this.x, this.y, "red"));
	}




	// _checkCollisison(x, y) {
	// 	const tile = currentLocation.floor[Math.floor(y / scaledTileSize())][Math.floor(x / scaledTileSize())];
	// 	if (tile.solid) {
	// 		return true;
	// 	}
	// 	return false;
	// }
}