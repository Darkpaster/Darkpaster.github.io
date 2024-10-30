import { AnimatedImage, StaticImage } from "./image.js";


export const firstCharacter = {
    attacking: new AnimatedImage("attacking", "src/assets/character/first/Attack1.png", 6),
    attacking2: new AnimatedImage("attacking2", "src/assets/character/first/Attack2.png", 6),
    death: new AnimatedImage("death", "src/assets/character/first/Death.png", 8),
    hurt: new AnimatedImage("hurt", "src/assets/character/first/Hurt.png", 4),
    idle: new AnimatedImage("idle", "src/assets/character/first/Idle.png", 4),
    run: new AnimatedImage("run", "src/assets/character/first/Run.png", 6),
    runAttack: new AnimatedImage("runAttack", "src/assets/character/first/RunAttack1.png", 6),
    runAttack2: new AnimatedImage("runAttack2", "src/assets/character/first/RunAttack2.png", 6),
    takeDamage: new AnimatedImage("takeDamage", "src/assets/character/first/Squat.png", 4),
    walk: new AnimatedImage("walk", "src/assets/character/first/Walk.png", 6),
    walkAttack: new AnimatedImage("walkAttack", "src/assets/character/first/WalkAttack1.png", 6),
    walkAttack2: new AnimatedImage("walkAttack2", "src/assets/character/first/WalkAttack2.png", 6),
},
    blueWitchSheet = {
        walk: new AnimatedImage("walk", "src/assets/character/blueWitch/B_witch_run.png", 8),
        idle: new AnimatedImage("idle", "src/assets/character/blueWitch/B_witch_idle.png", 6),
        takeDamage: new AnimatedImage("takeDamage", "src/assets/character/blueWitch/B_witch_take_damage.png", 3, true),
        attack: new AnimatedImage("attack", "src/assets/character/blueWitch/B_witch_attack.png", 9, true),
        charge: new AnimatedImage("charge", "src/assets/character/blueWitch/B_witch_charge.png", 5),
        death: new AnimatedImage("death", "src/assets/character/blueWitch/B_witch_death.png", 12, true),
    };




    