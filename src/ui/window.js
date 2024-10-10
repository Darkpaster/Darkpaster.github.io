import { gameWindow } from "../graphics/graphics.js";
import { createButton } from "./button.js";

export class Win {
    constructor(content = "Default content.", width = gameWindow.width / 2, height = gameWindow.height / 1.5){
        const styles = `
        background-color: blue;
        color: black;
        border-radius: 2dvi;
        opacity: 0.5;
        width: ${width}px;
        height: ${height}px;
        display: flex;
        padding: 3dvi;
        justify-content: center;
        align-items: space-between;
        `;
        this.element = document.createElement("div");
        this.element.setAttribute("style", styles);
        this.element.textContent = content;
        this.element.appendChild(createButton("ok", () => this.hide()));
    }
    hide(){
        this.element.style.display = "none"
    }
}