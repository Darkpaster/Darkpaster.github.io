import { Actor } from "../actor.js";


export class Mob extends Actor {
    constructor() {
        super();
        Actor.actorList.push(this);
    }

}