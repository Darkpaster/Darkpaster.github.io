export class Win {
    constructor(type, ...content){
        this.element = document.createElement("div");
        this.element.className = type;
        content.forEach(element => {
            this.element.appendChild(element);
        });
        document.getElementById("menu").appendChild(this.element);
    }
    hide(){
        this.element.style.display = "none";
    }
    show() {
        this.element.style.display = "block";
    }
}