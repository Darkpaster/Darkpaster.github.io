export class Win {
    constructor(type, ...content){
        this.element = document.createElement("div");
        this.element.className = type;
        for (const element of content) {
            this.element.appendChild(element);
        }
    }
    hide(){
        this.element.style.display = "none";
    }

    isHidden(){
        return this.element.style.display === "none";
    }
    show(value = "flex") {
        this.element.style.display = value;
    }
}