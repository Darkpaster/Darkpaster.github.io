

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

// export class setCallBack {
//     constructor(callback, delayTime) {
//         this.callback = callback;
//         this.delayTime = delayTime;
//         this.startTime = null;
//         this.isCalled = false;
//         this.isStarted = false;
//         this.start();
//     }
//     start() {
//         this.startTime = Date.now();
//         this.isStarted = true;
//         this.isCalled = false;
//         this.loop();
//     }
//     loop() {
//         if (this.isStarted) {
//             if (Date.now() - this.startTime > this.delayTime) {
//                 this.isStarted = false;
//                 this.isCalled = true;
//                 this.callback();
//             }
//         }
//     }
// }