import { player } from "../main.js";
import { charAttackSheet, charIdleSheet, charWalkSheet } from "./sprites.js";

const scale = 3,
framesPerSecond = 10;
let lastFliped = false;

export function walkFrames(ctx, _flipX = false, last = false) {
    drawEntity(ctx, charWalkSheet, !last ? _flipX : lastFliped);
}
export function idleFrames(ctx) {
    drawEntity(ctx, charIdleSheet, lastFliped);
}
export function attackFrames(ctx) {
    drawEntity(ctx, charAttackSheet, lastFliped);
}

function drawEntity(ctx, sheet, flipX) {
    const spriteWidth = sheet.width / sheet.framesNumber;
    const spriteHeight = 42;
    if (flipX) {
        ctx.save();
        ctx.scale(-1, 1);
        ctx.drawImage(sheet, sheet.currentFrame * spriteWidth, 0, spriteWidth,
            spriteHeight, -player.x - sheet.width * 2 / sheet.framesNumber, player.y,
            sheet.width / sheet.framesNumber * scale, 42 * scale);
        ctx.restore();
        lastFliped = true;
    } else {
        ctx.drawImage(sheet, sheet.currentFrame * spriteWidth, 0, spriteWidth,
            spriteHeight, player.x, player.y, sheet.width / sheet.framesNumber * scale, 42 * scale);
        lastFliped = false;
    }
    sheet.currentFrame++;
    if (sheet.currentFrame >= sheet.framesNumber) sheet.currentFrame = 0;
}