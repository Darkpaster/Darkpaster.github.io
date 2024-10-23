import { pressDown, pressLeft, pressRight, pressUp } from "../io.js";
import { scaledTileSize } from "../utils.js";
import locationList from "../world/locationList.js";

export class Player {
	constructor(){
		this.location = locationList.spawn.floor;
		this.name = "Guts";
		this.x = this.location.length * scaledTileSize() / 2;
		this.y = this.location.length * scaledTileSize() / 2;
		this.speed = 20;
        // this.char = char;
		this.health = 30;
		this.defense = 10;
		this.damage = 5;
		this.attackDelay = 1;
		this.attackRange = 10;
		this.jumpHeight = 20;
	}
	update(){
	const diff = {x: this.x, y: this.y};
	if(pressUp){
		this.y -= this.speed;
	}
	if(pressDown){
		this.y += this.speed;
	}
	if(pressLeft){
		this.x -= this.speed;
	}
	if(pressRight){
		this.x += this.speed;
	}
	if(this.location.length * scaledTileSize() < this.y || this.y < 0) {
		this.y = diff.y;
	}
	if (this.location[0].length * scaledTileSize() < this.x || this.x < 0) {
		this.x = diff.x;
	}
	diff.x -= this.x;
	diff.y -= this.y;

	return diff;
	}
}