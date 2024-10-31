import { madBoarManager } from "../../../../graphics/animations.js";
import { scaledTileSize } from "../../../../utils/math.js";
import { Mob } from "./../mob.js";


export class madBoar extends Mob {
    constructor(ff = 0) {
        super();
        this.x += scaledTileSize() * 6 + ff * scaledTileSize();
        this.name = "Mad boar";
        this.image = madBoarManager;
        // this.spellBook.push(new FrostWave(this));
    }
}