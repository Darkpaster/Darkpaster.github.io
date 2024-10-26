import { blueWitchImageManager, heroImageManager } from "../../graphics/animations.js";
import { pressDown, pressLeft, pressRight, pressUp } from "../../io/input.js";
import { scaledTileSize } from "../../utils/math.js";
import { getCurrentLocation } from "../world/locationList.js";
import { Actor } from "./actor.js";

export class Player extends Actor{
	constructor(){
		super();
		this.x += 800;
		this.health = 1000;
		this.image = heroImageManager;
		this.name = "Guts";
		this.inventory = [];
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

		this.moveSpeed = 5;
	}

	pickUp(item){
		this.inventory.push(item);
	}

	drop(item){
		this.inventory.splice(this.inventory.indexOf(item), 1);
	}

	equip(item){
		this.equipmentSlot(item);
		this.drop(item);
	}

	unEquip(item){
		this.pickUp(item);
		this.equipmentSlot(null); // will not work
	}

	learn(spell){
		this.spellBook.push(spell);
	}

	equipmentSlot(item){
		if(item.type === "head"){
			this.equipment.head = item;
		}
		if(item.type === "body"){
			this.equipment.body = item;
		}
		if(item.type === "legs"){
			this.equipment.legs = item;
		}
		if(item.type === "boots"){
			this.equipment.boots = item;
		}
		if(item.type === "arms"){
			this.equipment.arms = item;
		}
		if(item.type === "weapon"){
			this.equipment.weapon = item;
		}
		if(item.type === "shield"){
			this.equipment.shield = item;
		}
		if(item.type === "accessory"){
			this.equipment.accessory = item;
		}
		if(item.type === "ring"){
			if(this.equipment.ring1 === null){
				this.equipment.ring1 = item;
			}else if(this.equipment.ring2 === null){
				this.equipment.ring2 = item;
			}else{
				this.equipment.ring1 = item;
			}
		}
	}

	updatePlayer(x = 0, y = 0){
	const diff = {x: this.x, y: this.y};
	if(pressUp){
		this.y -= this.moveSpeed;
		this.direction = "up";
	}
	if(pressDown){
		this.y += this.moveSpeed;
		this.direction = "down";
	}
	if(pressLeft){
		this.x -= this.moveSpeed;
		this.direction = "left";
	}
	if(pressRight){
		this.x += this.moveSpeed;
		this.direction = "right";
	}
	if(x !== 0){
		this.x = x;
	}
	if(y !== 0){
		this.y = y;
	}

	if(getCurrentLocation().floor.length * scaledTileSize() < this.y || this.y < 0) {
		this.y = diff.y;
	}
	if (getCurrentLocation().floor[0].length * scaledTileSize() < this.x || this.x < 0) {
		this.x = diff.x;
	}

	diff.x -= this.x;
	diff.y -= this.y;
	if(diff.x !== 0 || diff.y !== 0) {
		this.renderState = "walk";
	}else{
		this.renderState = "idle";
	}

	return diff;
	}
}