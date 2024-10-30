import { greyPotion } from "../../../graphics/paths.js";
import { player } from "../../update.js";
import { Item } from "../item.js";


export class Potion extends Item{
    constructor() {
        super();
        this.spritePath = greyPotion;
        this.name = "Unknown potion";
        this.description = "It has unknown effects."
        this.cooldown = 0;
        this.price = 1;
    }

    onUse() {
        alert("default!");
    }
}