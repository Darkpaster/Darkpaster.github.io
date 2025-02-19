import { villagerManager } from "../../graphics/animations.js";
import { pressDown, pressLeft, pressRight, pressUp } from "../../io/input.js";
import { calcDistance, scaledTileSize } from "../../utils/math.js";
import { smallPotionOfHealing } from "../items/consumable/potions/smallPotionOfHealing.js";
import { FrostWave } from "../skills/frostWave.js";
import { Slash } from "../skills/slash.js";
import { Actor } from "./actor.js";
import { Mob } from "./mobs/mob.js";

export class Player extends Actor {
	constructor() {
		super();
		this.x += scaledTileSize() * 20;
		this.HP = 500;
		this.HT = 500;
		this.minDamage = 15;
		this.maxDamage = 35;
		this.criticalChance = 0.3;
		this.AA = true;
		this.image = villagerManager;
		this.name = "Guts";
		this.inventory = new Array(200);
		this.spellBook = [new Slash(this), null, null, null, null, null, null, null];
		for (let i = 0; i < this.inventory.length / 10; i++) {
			// this.inventory[0] = new Potion();
			this.inventory[i] = new smallPotionOfHealing();
		}

		this.equipment = {
			head: null,
			body: null,
			legs: null,
			boots: null,
			arms: null,
			weapon: null,
			shield: null,
			accessory: null,
			ring1: null,
			ring2: null
		};
		this.strength = 10,
			this.dexterity = 10,
			this.intelligence = 10,
			this.wisdom = 10,
			this.constitution = 10,
			this.charisma = 10,
			this.luck = 10,
			this.experience = 0,
			this.level = 1,
			this.gold = 0,
			this.inventorySize = 20,
			this.equipmentSize = 6,
			this.skillPoints = 0;

		this.moveSpeed = 4;
	}

	pickUp(item) {
		this.inventory.push(item);
	}

	drop(item) {
		this.inventory.splice(this.inventory.indexOf(item), 1);
	}

	equip(item) {
		this.equipmentSlot(item);
		this.drop(item);
	}

	unEquip(item) {
		this.pickUp(item);
		this.equipmentSlot(null); // will not work
	}

	learn(spell) {
		this.spellBook.push(spell);
	}

	equipmentSlot(item) { // switch is better choice
		if (item.type === "head") {
			this.equipment.head = item;
		}
		if (item.type === "body") {
			this.equipment.body = item;
		}
		if (item.type === "legs") {
			this.equipment.legs = item;
		}
		if (item.type === "boots") {
			this.equipment.boots = item;
		}
		if (item.type === "arms") {
			this.equipment.arms = item;
		}
		if (item.type === "weapon") {
			this.equipment.weapon = item;
		}
		if (item.type === "shield") {
			this.equipment.shield = item;
		}
		if (item.type === "accessory") {
			this.equipment.accessory = item;
		}
		if (item.type === "ring") {
			if (this.equipment.ring1 === null) {
				this.equipment.ring1 = item;
			} else if (this.equipment.ring2 === null) {
				this.equipment.ring2 = item;
			} else {
				this.equipment.ring1 = item;
			}
		}
	}

	updatePlayer() {
		let cnt = false;
		if (this.x % scaledTileSize() !== 0) {
			this.x -= this.offsetX;
			cnt = true;
		}
		if (this.y % scaledTileSize() !== 0) {
			this.y -= this.offsetY;
			cnt = true;
		}
		if (cnt) {
			return { x: this.offsetX, y: this.offsetY }
		}

		if (this.AA) {
			this.attackEvents();
		}

		this.nextPosY = this.getPosY();

		const cameraDiff = { x: this.x, y: this.y }
		if (pressUp) {
			this.y -= this.moveSpeed;
		} else if (pressDown) {
			this.y += this.moveSpeed;
		}
		if (pressLeft) {
			this.direction = "left";
			this.x -= this.moveSpeed;
		} else if (pressRight) {
			this.direction = "right";
			this.x += this.moveSpeed;
		}


		if (cameraDiff.x - this.x < 0) {
			this.nextPosX = this.getPosX() + 1;
		} else {
			this.nextPosX = this.getPosX();
		}
		if (cameraDiff.y - this.y < 0) {
			this.nextPosY = this.getPosY() + 1;
		} else {
			this.nextPosY = this.getPosY();
		}

		const collision = this.collision(Mob.mobList);
		if (collision.x) {
			this.x = cameraDiff.x;
		}
		if (collision.y) {
			this.y = cameraDiff.y;
		}

		this.offsetX = cameraDiff.x = cameraDiff.x - this.x;
		this.offsetY = cameraDiff.y = cameraDiff.y - this.y;


		return cameraDiff;
	}
	
	selectNearestTarget() {
		let nearest = this.target || {x: 0, y: 0};
		for (const mob of Mob.mobList) {
			const dist = calcDistance(mob, this);
			if (dist < 430) {
				if (dist < calcDistance(nearest, this)) {
					nearest = mob;
				}
			}
		}
		if (nearest.x === 0) {
			return
		}
		this.target = nearest;
	}
}