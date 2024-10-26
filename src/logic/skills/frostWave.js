import { Skill } from "./skill.js";

export class FrostWave extends Skill {
    constructor(owner) {
          super(owner, 2000, 5000);
          this.name = "Frost Wave";
          this.minDamage = 20;
          this.maxDamage = 34;
          this.range = 6;
     }
}