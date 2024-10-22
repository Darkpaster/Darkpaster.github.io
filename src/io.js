import { play } from "./graphics/graphics.js";
import { gameState } from "./main.js";

export let pressUp, pressDown, pressLeft, pressRight,
	pressJump, pressAttack, pressPause = false;
const bindings = {
	up: "w",
	down: "s",
	left: "a",
	right: "d",
	attack: "f",
	jump: "Space",
	pause: "Escape",
	fullscreen: "f11",
	mute: "m",
	volumeUp: "up arrow",
	volumeDown: "down arrow"
}
document.addEventListener("keydown", (event) => {
	if (event.key === bindings.left) {
		pressLeft = true;
	} else if (event.key === bindings.up) {
		pressUp = true;
	} else if (event.key === bindings.right) {
		pressRight = true;
	} else if (event.key === bindings.down) {
		pressDown = true;
	} else if (event.key === bindings.jump) {
		pressJump = true;
	} else if (event.key === bindings.pause) {
		if(gameState === "paused") {
			play.click();
			return;
		}
		pressPause = true;
	}
	else if (event.key === bindings.attack) {
		pressAttack = true
	}
})
document.addEventListener("keyup", (event) => {
	if (event.key === bindings.left) {
		pressLeft = false;
	} else if (event.key === bindings.up) {
		pressUp = false;
	} else if (event.key === bindings.right) {
		pressRight = false;
	} else if (event.key === bindings.down) {
		pressDown = false;
	} else if (event.key === bindings.jump) {
		pressJump = false;
	} else if (event.key === bindings.pause) {
		pressPause = false;
	}else if (event.key === bindings.attack) {
		pressAttack = false;
	}
});