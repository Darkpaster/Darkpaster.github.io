import { SpriteImage } from "./image.js";

export const charAttackSheet = new SpriteImage(6), charAttack2Sheet = new SpriteImage(),
    charDeathSheet = new SpriteImage(), charFallAttackSheet = new SpriteImage(),
    charHurtSheet = new SpriteImage(), charIdleSheet = new SpriteImage(4),
    charJumpSheet = new SpriteImage(), charJumpAttackSheet = new SpriteImage(),
     charRunSheet = new SpriteImage(),
    charRunAttack1Sheet = new SpriteImage(), charRunAttack2Sheet = new SpriteImage(),
    charSquatSheet = new SpriteImage(), charWalkSheet = new SpriteImage(6),
    charWalkAttack1Sheet = new SpriteImage(), charWalkAttack2Sheet = new SpriteImage(),
    backgroundSheet2 = new SpriteImage(), backgroundSheet3 = new SpriteImage();
charAttackSheet.src = "src/assets/character/Attack1.png";
charAttack2Sheet.src = "src/assets/character/Attack2.png";
charJumpSheet.src = "src/assets/character/Jump.png";
charRunSheet.src = "src/assets/character/Run.png";
charWalkSheet.src = "src/assets/character/Walk.png";
charIdleSheet.src = "src/assets/character/Idle.png";
charDeathSheet.src = "src/assets/character/Death.png";
charFallAttackSheet.src = "src/assets/character/FallAttack.png";
charHurtSheet.src = "src/assets/character/Hurt.png";
charJumpAttackSheet.src = "src/assets/character/JumpAttack.png";
charRunAttack1Sheet.src = "src/assets/character/RunAttack1.png";
charRunAttack2Sheet.src = "src/assets/character/RunAttack2.png";
charSquatSheet.src = "src/assets/character/Squat.png";
charWalkAttack1Sheet.src = "src/assets/character/WalkAttack1.png";
charWalkAttack2Sheet.src = "src/assets/character/WalkAttack2.png";

backgroundSheet2.src = "src/assets/backgrounds/Battleground2.png";
backgroundSheet3.src = "src/assets/backgrounds/Battleground3.png";