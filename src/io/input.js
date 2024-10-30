import { camera } from "../logic/update.js";
import { clickAt } from "../ui/components.js";

export let pressUp, pressDown, pressLeft, pressRight,
	pressAttack = false;
const bindings = {
	up: "w",
	down: "s",
	left: "a",
	right: "d",
	pause: "Escape",
	inventory: "b",
	fullscreen: "f11",
	zoomIn: "=",
	zoomOut: "-"
}

export function initKeyboard() {

canvas.addEventListener("keydown", (event) => {
	switch (event.key) {
		case bindings.left:
			pressLeft = true;
			break;
		case bindings.up:
			pressUp = true;
			break;
		case bindings.right:
			pressRight = true;
			break;
		case bindings.down:
			pressDown = true;
			break;
		// case bindings.fullscreen:
		// 	if (document.fullscreenElement) {
		// 		document.exitFullscreen();
		// 	} else {
		// 		document.documentElement.requestFullscreen();
		// 	}
		// 	break;
		case bindings.zoomIn:
			if (camera.zoom < 4) {
				camera.zoom += 1;
			}
			break;
		case bindings.zoomOut:
			if (camera.zoom > 2) {
				camera.zoom -= 1;
			}
			break;
	}
})

canvas.addEventListener("keyup", (event) => {
	switch (event.key) {
		case bindings.left:
			pressLeft = false;
			break;
		case bindings.up:
			pressUp = false;
			break;
		case bindings.right:
			pressRight = false;
			break;
		case bindings.down:
			pressDown = false;
			break;
		case bindings.pause:
			clickAt("resume");
			return
		case bindings.inventory:
			clickAt("open-close-inventory");
			break;
		case "e":
			alert(document.activeElement);
			break;
	}
});


}