import { slash } from "../../graphics/paths.js";
import { Skill } from "./skill.js";

export class Slash extends Skill {
    constructor(owner) {
          super(owner);
          this.icon = slash;
          this.name = "Slash";
          this.minDamage = 70;
          this.maxDamage = 100;
     }
}