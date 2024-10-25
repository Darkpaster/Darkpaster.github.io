import { blueWitchImageManager } from "../../../graphics/animations.js";
import { Mob } from "./mob.js";


export class blueWitch extends Mob {
    constructor() {
        super();
        this.x += 300;
        this.name = "Blue Witch";
        this.image = blueWitchImageManager;
    }
}