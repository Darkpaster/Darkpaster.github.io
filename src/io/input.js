import { Mob } from "../logic/actors/mobs/mob.js";
import { camera, player } from "../logic/update.js";
import { clickAt } from "../ui/components.js";
import { scaledTileSize } from "../utils/math.js";

export let pressUp, pressDown, pressLeft, pressRight,
	pressShift, pressAttack = false;
const bindings = {
	up: "w",
	down: "s",
	left: "a",
	right: "d",
	pause: "Escape",
	inventory: "b",
	fullscreen: "f11",
	zoomIn: "=",
	zoomOut: "-",
	tab: "Tab",
	shift: "Shift",
	enter: "Enter",
	b1: "1",
	b2: "2",
	b3: "3",
	b4: "4",
}

function clickOffsetX() {
	return player.x - window.innerWidth / 2 + scaledTileSize();
}
function clickOffsetY() {
	return player.y - window.innerHeight / 2 + scaledTileSize();
}

export function initKeyboard() {
	canvas.onclick = event => {
		player.target = Mob.getMobsOnTile(event.clientX + clickOffsetX(),
			event.clientY + clickOffsetY())[0] || null;
	}

	canvas.oncontextmenu = event => {
		event.preventDefault();
	}

	canvas.addEventListener("keydown", event => {
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
			case bindings.tab:
				event.preventDefault();
				player.selectNearestTarget();
				break;
			case bindings.shift:
				// event.preventDefault();
				pressShift = true;
				break;
			case bindings.b1:
				clickAt("skill-0");
				break;
		}
	})

	canvas.addEventListener("keyup", event => {

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
			case bindings.shift:
				pressShift = false;
				break;
			case bindings.pause:
				clickAt("resume");
				return
			case bindings.inventory:
				clickAt("open-close-inventory");
				break;
			case "e":
				player.AA = !player.AA;
				break;
			case bindings.enter:
				// document.getElementById
				break;
		}
	});


}