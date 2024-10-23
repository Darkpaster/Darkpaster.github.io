import { settings } from "../configs/settings.js";
import { pressLeft, pressRight } from "../io.js";
import { player } from "../main.js";

export class AnimatedImageManager {
    constructor(list) {
        this.list = list;
        this.isFlipped = false;
        this.currentAnimation = "idle";
    }

    render(sheet, ctx) {
        const current = this.list[sheet];
        const prevAnimation = this.currentAnimation;
        if (!current) {
            alert(sheet + " not found in AnimatedImageManager");
        }
        this.isFlipped = current.animate(ctx, this.isFlipped);
        this.currentAnimation = sheet;
        if (prevAnimation !== this.currentAnimation) {
            this.list[prevAnimation].currentFrame = 0;
        }
    }

}

export class AnimatedImage extends Image {
    constructor(src, framesNumber, framesRate = 200, scale = settings.defaultTileScale) {
        super();
        this.src = src;
        this.framesNumber = framesNumber;
        this.currentFrame = 0;
        this.framesRate = Math.floor(framesRate / settings.delay());
        this.frameCounter = 0;
        this.scale = scale;
    }

    timeToSwapFrame() {
        if (this.frameCounter > this.framesRate) {
            this.frameCounter = 0;
        }
        return ++this.frameCounter >= this.framesRate;
    }

    animate(ctx, isFlipped) {
        const spriteWidth = this.width / this.framesNumber;
        const spriteHeight = 42;
        const flipX = pressLeft || isFlipped && !pressRight;
        if (flipX) {
            ctx.save();
            ctx.scale(-1, 1);
            ctx.drawImage(this, this.currentFrame * spriteWidth, 0, spriteWidth,
                spriteHeight, -player.x - spriteWidth * 2, player.y,
                spriteWidth * this.scale, spriteHeight * this.scale);
            ctx.restore();
        } else {
            ctx.drawImage(this, this.currentFrame * spriteWidth, 0, spriteWidth,
                spriteHeight, player.x, player.y, spriteWidth * this.scale, spriteHeight * this.scale);
        }

        if (this.timeToSwapFrame()) {
            this.currentFrame++;
            if (this.currentFrame >= this.framesNumber) this.currentFrame = 0;
        }

        return flipX;
    }

}

export class StaticImage extends Image {
    constructor(src) {
        super();
        this.src = src;
    }
}


export class tileImage extends StaticImage {
    constructor(src, tileX, tileY, _tileSize = settings.tileSize) {
        super(src);
        this.tile = null;
        this.onload = () => createImageBitmap(this, tileX * _tileSize, tileY * _tileSize, _tileSize, _tileSize).then(bitmap => {
            this.tile = bitmap;
        });
    }
}