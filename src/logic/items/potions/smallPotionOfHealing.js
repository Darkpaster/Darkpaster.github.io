import { FloatText } from "../../../graphics/floatText.js";
import { floatTextList } from "../../../graphics/graphics.js";
import { redPotion } from "../../../graphics/paths.js";
import { randomInt } from "../../../utils/math.js";
import { player } from "../../update.js";
import { Potion } from "./potion.js";


export class smallPotionOfHealing extends Potion {
    constructor() {
        super();
        this.spritePath = redPotion;
        this.name = "Potion of healing";
        this.description = "On use it heals for 10 - 15 points.";
        this.note = '\"Made by some amateur alchemist.\"';
    }

    onUse() {
        const value = Math.min(randomInt(10, 15), player.maxHealth - player.health);
        player.health += value;
        floatTextList.push(new FloatText(value, player.x, player.y, "green"));
    }
}