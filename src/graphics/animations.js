import {settings} from "../configs/settings.js";
import { player } from "../main.js";
import { charAttackSheet, charIdleSheet, charWalkSheet } from "./sprites.js";

const scale = 3;

function calcAnimationRate() {
    return Math.floor(200 / settings.delay());
}
let lastFliped = false;
let counter = 0;

function timeToSwapFrame() {
    if (counter > calcAnimationRate()){
        counter = 0;
    }
    return ++counter >= calcAnimationRate();
}

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
    const test = timeToSwapFrame();
    if(test){
        sheet.currentFrame++;
        if (sheet.currentFrame >= sheet.framesNumber) sheet.currentFrame = 0;
    }
    ctx.fillText(test ? "Swap frame" : "Waiting", canvas.width / 2, canvas.height / 2);
}