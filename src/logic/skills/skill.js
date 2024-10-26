import { calculateDistance, randomInt, scaledTileSize } from "../../utils/math.js";
import { CallbackTimer } from "../../utils/time.js";
import { init } from "../update.js";


export class Skill {
    constructor(owner, delay = 200, cooldown = 3000) {
         this.name = "Unknown skill";
         this.description = "No description";
         this.minDamage = 2;
         this.maxDamage = 6;
         this.damageType = "physical";
         this.range = 3;
         this.cost = 0;
         this.owner = owner;
         this.process = new CallbackTimer(() => {
            this.execute();
            owner.renderState = "attack";
        }, 
        delay, new CallbackTimer(() => {}, cooldown));
     }

     useSkill() {
        if(this.owner.image.currentAnimation.disposable) {
            this.owner.renderState = "idle";
        }
        if (this.range < calculateDistance(this.owner, this.owner.target) / scaledTileSize()) {
            this.stop();
            return false;
        }

        if(!this.process.id) {
            this.process.start();
            if(this.process.cooldown.done) {
                return false;
            }
        }else{
            if(!this.process.cooldown.done) {
                this.owner.renderState = "charge";
            }

        }

        return true

     }

     execute() {
        let realDamage = 0;
        realDamage = randomInt(this.minDamage, this.maxDamage);
        if (this.owner.target.defenseType === this.damageType) {
            realDamage = this.damage - target.defense;
        }
        this.owner.target.dealDamage(realDamage);
        //  alert(`${this.name} used on ${target.name} for ${this.damage} damage!`);
     }

     stop() {
         if (this.process) {
             this.process.stop();
         }
     }
}