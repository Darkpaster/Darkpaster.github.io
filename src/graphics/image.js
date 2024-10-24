import { settings } from "../configs/settings.js";
import { pressLeft, pressRight } from "../io/input.js";
import { Delay } from "../utils/time.js";

export class AnimatedImageManager {
    constructor(list, flipX = true, horizontalSheet = true) {
        this.list = list;
        this.isFlipped = false;
        this.currentAnimation = "idle";
        this.flipX = flipX;
        this.horizontalSheet = horizontalSheet;

        for (const key in this.list) {
            this.list[key].manager = this;
        }
    }

    render(sheet, ctx, x, y, direction) {
        const current = this.list[sheet];
        const prevAnimation = this.currentAnimation;
        if (!current) {
            alert(sheet + " not found in AnimatedImageManager");
        }
        this.isFlipped = current.animate(ctx, this.isFlipped, x, y, direction);
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
        this.framesRate = new Delay(Math.floor(framesRate / settings.delay()))
        this.scale = scale;
    }

    animate(ctx, isFlipped, x, y, direction) {
        if (!this.manager.flipX) {
            isFlipped = false;
        }
        let spriteWidth = this.width / this.framesNumber;
        let spriteHeight = this.height;
        let cutX = this.currentFrame * spriteWidth;
        let cutY = 0;
        if(!this.manager.horizontalSheet) {
            spriteWidth = this.width;
            spriteHeight = this.height / this.framesNumber;
            cutX = 0;
            cutY = this.currentFrame * spriteHeight;
        }
        const flipX = direction === "left" || isFlipped && direction !== "right";
        if (flipX) {
            ctx.save();
            ctx.scale(-1, 1);
            ctx.drawImage(this, cutX, cutY, spriteWidth,
                spriteHeight, -x - spriteWidth * 2, y,
                spriteWidth * this.scale, spriteHeight * this.scale);
            ctx.restore();
        } else {
            ctx.drawImage(this, cutX, cutY, spriteWidth,
                spriteHeight, x, y, spriteWidth * this.scale, spriteHeight * this.scale);
        }

        if (this.framesRate.timeIsUp()) {
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