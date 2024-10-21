export class SpriteImage extends Image {
    constructor(src, framesNumber = 1){
        super();
        this.src = src;
        this.framesNumber = framesNumber;
        this.currentFrame = 0;
    }
}