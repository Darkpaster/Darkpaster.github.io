import { settings } from "../configs/settings.js";
import { scaledTileSize } from "../utils/math.js";
import { Delay } from "../utils/time.js";

export class AnimatedImageManager {
    constructor(list, flipX = true, horizontalSheet = true) {
        this.list = list;
        this.isFlipped = false;
        this.currentAnimation = this.list["idle"] || this.list[Object.keys(this.list)[0]];
        this.flipX = flipX;
        this.horizontalSheet = horizontalSheet;

        for (const key in this.list) {
            this.list[key].manager = this;
        }
    }

    render(sheet, ctx, x, y, direction) {
        const current = this.list[sheet];
        const prevAnimation = this.currentAnimation;
        if (prevAnimation.disposable && !prevAnimation.endOfAnimation) {
            prevAnimation.animate(ctx, this.isFlipped, x, y, direction);
            return
        }
        if (!current) {
            alert(sheet + " not found in AnimatedImageManager");
        }
        this.isFlipped = current.animate(ctx, this.isFlipped, x, y, direction);
        this.currentAnimation = current;
        if (prevAnimation.name !== this.currentAnimation.name) {
            prevAnimation.currentFrame = 0;
        }
    }

    update(scale) {
        for (const key in this.list) {
            this.list[key].scale += scale;
        }
    }

}

export class AnimatedImage extends Image {
    constructor(name, src, framesNumber, disposable = false,
        framesRate = 400, scale = settings.defaultTileScale) {
        super();
        this.name = name;
        this.src = src;
        this.framesNumber = framesNumber;
        this.currentFrame = 0;
        this.framesRate = new Delay(Math.floor(framesRate / settings.delay()))
        this.scale = scale;
        this.disposable = disposable;
        this.endOfAnimation = false;
    }

    animate(ctx, isFlipped, x, y, direction) {
        if (!this.manager.flipX) {
            isFlipped = false;
        }
        if (this.endOfAnimation){
            this.endOfAnimation = false;
        }
        let spriteWidth = this.width / this.framesNumber;
        let spriteHeight = this.height;
        let cutX = this.currentFrame * spriteWidth;
        let cutY = 0;
        // if (!this.manager.horizontalSheet) {
        //     spriteWidth = this.width;
        //     spriteHeight = this.height / this.framesNumber;
        //     cutX = 0;
        //     cutY = this.currentFrame * spriteHeight;
        // }
        // const renderXOffset = spriteWidth * this.scale / 2;
        // const renderYOffset = spriteHeight * this.scale / 2;
        const flipX = direction === "left" || isFlipped && direction !== "right";
        if (flipX) {
            ctx.save();
            ctx.scale(-1, 1);
            ctx.drawImage(this, cutX, cutY, spriteWidth,
                spriteHeight, -x - scaledTileSize(), y,
                spriteWidth * settings.defaultTileScale, spriteHeight * settings.defaultTileScale);
            ctx.restore();
        } else {
            ctx.drawImage(this, cutX, cutY, spriteWidth,
                spriteHeight, x, y, spriteWidth * settings.defaultTileScale, spriteHeight * settings.defaultTileScale);
        }

        if (this.framesRate.timeIsUp()) {
            this.currentFrame++;
            if (this.currentFrame >= this.framesNumber) {
                this.currentFrame = 0;
                if (this.disposable) {
                    this.endOfAnimation = true;
                }
            }
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