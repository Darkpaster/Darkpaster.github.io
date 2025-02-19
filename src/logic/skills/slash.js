import { slash } from "../../graphics/paths.js";
import { slashEffect } from "../../graphics/sprites.js";
import { Skill } from "./skill.js";

export class Slash extends Skill {
    constructor(owner) {
          super(owner);
          this.icon = slash;
          this.animation = slashEffect;
          this.name = "Slash";
          this.minDamage = 60;
          this.maxDamage = 85;
          this.description = `Hits enemy for ${this.minDamage} - ${this.maxDamage} damage.<br><br>Cooldown: ${this.cooldown / 1000}`;
     }
}