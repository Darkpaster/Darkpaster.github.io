export let pressUp, pressDown, pressLeft, pressRight, pressAttack = false;
document.addEventListener("keydown", (event) =>{
	if (event.key == "a"){
		pressLeft = true;
	}else if (event.key == "w"){
		pressUp = true;
	}else if (event.key == "d"){
		pressRight = true;
	}else if (event.key == "s"){
		pressDown = true;
	}else if (event.key == "f"){
		pressAttack = true;
	}
})
document.addEventListener("keyup", (event) =>{
	if (event.key == "a"){
		pressLeft = false;
	}else if (event.key == "w"){
		pressUp = false;
	}else if (event.key == "d"){
		pressRight = false;
	}else if (event.key == "s"){
		pressDown = false;
	}else if (event.key == "f"){
		pressAttack = false;
	}
});