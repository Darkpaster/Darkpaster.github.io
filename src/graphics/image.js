export class SpriteImage extends Image {
    constructor(framesNumber = 1){
        super();
        this.framesNumber = framesNumber;
        this.currentFrame = 0;
    }
}