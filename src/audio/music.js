const mainTheme = new Audio('./src/assets/sounds/music/RelaxingGreenNature.mp3'),
    sacredGarden = new Audio('./src/assets/sounds/music/sacred-garden.mp3');

    sacredGarden.volume = 0.5;

let currentMusic = mainTheme;

export function playMusic(title, stop = true) {
    currentMusic.pause();
    if (stop) {
        currentMusic.currentTime = 0;
    }
    switch (title) {
        case 'main':
            currentMusic = mainTheme;
            break;
        case 'garden':
            currentMusic = sacredGarden;
            break;
        default:
            currentMusic = mainTheme;
            break;
    }
    if (!currentMusic.played || currentMusic.paused) {
        currentMusic.play();
        currentMusic.loop = true;
    }
}

export function pauseMusic() {
    currentMusic.pause();
}
export function resumeMusic() {
    if(!currentMusic.paused)return;
    currentMusic.play();
}
export function setVolume(volume) {
    currentMusic.volume = volume;
}
