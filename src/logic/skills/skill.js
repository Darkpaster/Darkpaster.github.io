import { defaultSkill } from "../../graphics/paths.js";
import { calcDistance, randomInt, scaledTileSize } from "../../utils/math.js";
import { CallbackTimer } from "../../utils/time.js";


export class Skill {
    static damageType = {
        PHYSICAL: "physical",
        MAGICAL: "magical",
        ABSOLUTE: "absolute"
    }
    constructor(owner) {
        this.bind = null;
        this.name = "Unknown skill";
        this.icon = defaultSkill;
        this.description = "No description";
        this.minDamage = 2;
        this.maxDamage = 6;
        this.damageType = Skill.damageType.PHYSICAL;
        this.range = 3;
        this.cost = 0;
        this.owner = owner;
        this.delay = 200;
        this.cooldown = 5000;
        this.process = new CallbackTimer(() => {
            this.execute();
            owner.renderState = "attack";
        },
            this.delay, new CallbackTimer(() => { }, this.cooldown));
    }

    useSkill() {
        if (this.owner.image.currentAnimation.disposable) {
            this.owner.renderState = "idle";
        }
        if (this.range < calcDistance(this.owner, this.owner.target) / scaledTileSize()) {
            this.stop();
            return false;
        }

        if (!this.process.id) {
            this.process.start();
            if (this.process.cooldown.done) {
                return false;
            }
        } else {
            if (!this.process.cooldown.done) {
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
    }

    stop() {
        if (this.process) {
            this.process.stop();
        }
    }
}