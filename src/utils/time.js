

export class Delay {
    constructor(iterations) {
        this.frameCounter = 0;
        this.iterations = iterations;
    }

    timeIsUp() {
        if (this.frameCounter > this.iterations) {
            this.frameCounter = 0;
        }
        return ++this.frameCounter >= this.iterations;
    }
}