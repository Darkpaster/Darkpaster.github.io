import { blueWitchImageManager } from "../../../graphics/animations.js";
import { FrostWave } from "../../skills/frostWave.js";
import { Mob } from "./mob.js";


export class blueWitch extends Mob {
    constructor() {
        super();
        this.x += 300;
        this.name = "Blue Witch";
        this.image = blueWitchImageManager;
        this.spellBook.push(new FrostWave(this));
    }
}