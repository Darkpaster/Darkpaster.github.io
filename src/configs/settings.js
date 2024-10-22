//file for global game settigns
const _fps = Symbol('fps');

export const settings = {
    fullScreen: false,
    language: "en",
    difficulty: "normal",
    graphics: "high",
    soundVolume: 100,
    musicVolume : 100,
    [_fps]: 30,
    particles: true,

    get fps() {
        return this[_fps];
    },
    delay: function() {
        return 1000 / this[_fps];
    },
    set fps(fps) {
        this[_fps] = fps;
        if (this[_fps] < 1) {
            this[_fps] = 1;
        }
        if (this[_fps] > 60) {
            this[_fps] = 60;
        }
    }

    // "state": "playing"
    //state: 'over'
    //state: 'ready'
    //state: 'pause'
    //state: 'win'
    //state: 'lose'
    //state: 'menu'
    //state: 'settings'
    //state: 'credits'
    //state: 'about'
    //state: 'help'
    //state: 'intro'
    //state: 'outro'
    //state: 'loading'
    //state: 'transition'
    //state: 'gameover'
}