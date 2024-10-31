import { settings } from "../../configs/settings.js";
import { FloatText } from "../../graphics/floatText.js";
import { floatTextList } from "../../graphics/graphics.js";
import { getTile } from "../../graphics/tileSprites.js";
import { scaledTileSize } from "../../utils/math.js";
import { TimeDelay } from "../../utils/time.js";
import { getCurrentLocation } from "../world/locationList.js";

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
			this._moveSpeed = 2;
		this.image = null;
		this.attackDelay = new TimeDelay(2000, true);
		this.attackRange = 1;
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

	dealDamage(damage) {
		const realDamage = damage - this.defense;
		if (realDamage < 0) {
			return;
		}
		this.health -= damage;
		floatTextList.push(new FloatText(damage, this.x, this.y, "red"));
	}

	getPosTile() {
		return getTile(this)
	}

	collision(mobs) {
		const stop = {x: false, y: false};

		const scaledTile = scaledTileSize();
		if (getCurrentLocation().floor.length * scaledTile < this.y || this.y < 0) {
			stop.y = true;
		}
		if (getCurrentLocation().floor[0].length * scaledTile < this.x || this.x < 0) {
			stop.x = true;
		}

		const tileX = this.getPosX();
		const tileY = this.getPosY();

		for (const mob of mobs) {
			if (this === mob) {
				continue
			}
			if (mob.getPosX() === tileX && mob.getPosY() === tileY) {
				stop.x = stop.y = true;
			}
		}

		return stop
	}
}