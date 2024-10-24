import { calculateDistance, scaledTileSize } from "../../utils/math.js";


export class Skill {
    constructor() {
         this.name = "Unknown skill";
         this.damage = 1;
         this.damageType = "physical";
         this.range = 2;
         this.cooldown = 1;
         this.cost = 0;
     }

     useSkill(target) {
        if (this.range < calculateDistance(target) / scaledTileSize()) {
            alert(`${this.name} is out of range!`);
            return;
        }
        realDamage = this.damage;
        if (target.defenseType === this.damageType) {
            realDamage = this.damage - target.defense;
        }
        target.dealDamage(realDamage);
         alert(`${this.name} used on ${target.name} for ${this.damage} damage!`);
     }
}