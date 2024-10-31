import { AnimatedImage } from "./image.js";
import { madBoar, runningWolf, villagerDrunk } from "./paths.js";

export const zombie = {
        idle: new AnimatedImage("idle", "src/assets/character/basic asset pack/Basic Undead Animations/Mutilated Stumbler/MutilatedStumbler.png", 4),
        walk: new AnimatedImage("walk", "src/assets/character/basic asset pack/Basic Undead Animations/Mutilated Stumbler/MutilatedStumbler.png", 4),
    },
    skeleton = {
        idle: new AnimatedImage("idle", "src/assets/character/basic asset pack/Basic Undead Animations/Decrepit Bones/DecrepitBones.png", 4),
        walk: new AnimatedImage("walk", "src/assets/character/basic asset pack/Basic Undead Animations/Decrepit Bones/DecrepitBones.png", 4),
    },
    boar = {
        idle: new AnimatedImage("idle", madBoar, 4),
        walk: new AnimatedImage("walk", madBoar, 4),
    },
    villager = {
        idle: new AnimatedImage("idle", villagerDrunk, 4),
        walk: new AnimatedImage("walk", villagerDrunk, 4),
    },
    loading = {
        idle: new AnimatedImage("idle", runningWolf, 4),
        walk: new AnimatedImage("walk", runningWolf, 4),
    }




    