

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


export class TimeDelay {
    constructor(delayTime) {
        this.delayTime = delayTime;
        this.startTime = null;
    }
    timeIsUp() {
        if (this.startTime === null) {
            this.startTime = Date.now();
        }
        if (Date.now() - this.startTime > this.delayTime) {
            this.startTime = null;
            return true;
        }
    }
    setDelay(delayTime) {
        this.delayTime = delayTime;
    }
    reset() {
        this.startTime = null;
    }
}