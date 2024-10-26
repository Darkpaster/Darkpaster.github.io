

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
    constructor(delayTime, atStartNoDelay = false) {
        this.delayTime = delayTime;
        this.startTime = null;
    }
    timeIsUp() {
        if (this.startTime === null) {
            this.startTime = Date.now();
            if(this.atStartNoDelay) {
                return true;
            }
        }
        if (Date.now() - this.startTime > this.delayTime) {
            this.startTime = null;
            if(!this.atStartNoDelay) {
                return true;
            }
        }
    }
    setDelay(delayTime) {
        this.delayTime = delayTime;
    }
    reset() {
        this.startTime = null;
    }
    getLeftTime() {
        return this.delayTime - (Date.now() - this.startTime);
    }
    getLeftTimePercent() {
        return (this.delayTime - (Date.now() - this.startTime)) / this.delayTime;
    }

}

export class CallbackTimer {
    constructor(callback = () => {}, delay = 1000, cooldown = null) {
        this.callback = callback;
        this.delay = delay;
        this.id = null;
        this.cooldown = cooldown;
        this.done = false;
    }

    start(initCallback = null) {
        if(this.cooldown?.id && !this.cooldown.done) { //начало отсчёта кулдауна (до завершения)
            return;
        }
        this.done = false;
        this.id = setTimeout(() => {
            this.callback();
            this.done = true;
            this.stop();
        }, 
            this.delay);

        if(this.cooldown) {
            this.cooldown.restart();
        }
    }

    setCallback(callback) {
        this.callback = callback;
    }

    setDelay(delay) {
        this.delay = delay;
    }

    stop() {
        clearTimeout(this.id);
        this.id = null;
    }

    restart() {
        this.stop();
        this.start();
    }
}