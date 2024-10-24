import { randomInt, scaledTileSize } from "../../utils/math.js";
import { getCurrentLocation } from "../world/locationList.js";

export class Actor {
	static actorList = [];
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
		this.moveSpeed = 10;
		this.image = null;
		this.attackDelay = 1;
		this.attackRange = 10;
		this.state = "idle";
		this.direction = "down";
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

	die() {
		Actor.actorList.splice(Actor.actorList.indexOf(this), 1);
	}



    update() {
		const diff = { x: this.x, y: this.y };
		if (randomInt(6) === 0) {
			this.y -= this.moveSpeed;
		}
		if (randomInt(6) === 0) {
			this.y += this.moveSpeed;
		}
		if (randomInt(6) === 0) {
			this.x -= this.moveSpeed;
		}
		if (randomInt(6) === 0) {
			this.x += this.moveSpeed;
		}
		if (getCurrentLocation().floor.length * scaledTileSize() < this.y || this.y < 0) {
			this.y = diff.y;
		}
		if (getCurrentLocation().floor[0].length * scaledTileSize() < this.x || this.x < 0) {
			this.x = diff.x;
		}
		diff.x -= this.x;
		diff.y -= this.y;

		if(diff.x !== 0 || diff.y !== 0) {
			this.state = "walking";
		}else{
			this.state = "idle";
		}

		return diff;
	}

	// _checkCollisison(x, y) {
	// 	const tile = currentLocation.floor[Math.floor(y / scaledTileSize())][Math.floor(x / scaledTileSize())];
	// 	if (tile.solid) {
	// 		return true;
	// 	}
	// 	return false;
	// }
}