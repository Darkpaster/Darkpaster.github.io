import { pressDown, pressLeft, pressRight, pressUp } from "../io.js";

export class Player {
	constructor(){
		this.name = "Zoldik"
		this.x = 700;
		this.y = 600;
		this.speed = 20;
		this.direction = 0;
        // this.char = char;
		this.health = 30;
		this.defense = 10;
		this.damage = 5;
		this.attackDelay = 1;
		this.attackRange = 10;
		this.jumpHeight = 20;
	}
	update(){
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
	}
}

// function selectChar(name){
//     if(name === "warrior"){
//         return {

//             items: [new Item("stone"), new Item("sword")]
//         }
//     }
// }