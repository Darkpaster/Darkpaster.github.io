import { madBoarManager } from "../../../../graphics/animations.js";
import { scaledTileSize } from "../../../../utils/math.js";
import { Mob } from "./../mob.js";


export class madBoar extends Mob {
    constructor() {
        super();
        this.name = "Mad boar";
        this.image = madBoarManager;
        this.minDamage = 10;
        this.maxDamage = 20;
        // this.spellBook.push(new FrostWave(this));
    }
}