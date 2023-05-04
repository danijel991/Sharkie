let background_music = new Audio('./audio/background_music.mp3');
background_music.volume = 0.1; //set audio volume
let boss_music = new Audio('./audio/endboss_fight.mp3');
let victory = new Audio('./audio/victory.mp3');
boss_music.volume = 0.1;
victory.volume = 0.1;
victorygame = false;

function initMusic() {

    setInterval(() => {

        if (!bgMusicIsPlaying) {
            background_music.pause();
        } else if (bgMusicIsPlaying == true && world.endboss.hadFirstContact == false) {
            background_music.play();
        } else if (world.endboss.hadFirstContact == true) {
            background_music.pause();
            boss_music.play();
        } else if (victorygame == true) {
            console.log('victory');
        } else if (world.character.energy <= 0) {
            console.log('looooser');
        }
    }, 100);
}