let background_music = new Audio('./audio/background_music.mp3');
let boss_music = new Audio('./audio/endboss_fight.mp3');
let victory = new Audio('./audio/victory.mp3');
let gamelost = new Audio('./audio/game_over.mp3');
let swimming_sound = new Audio('./audio/char_swim.mp3');
let hurt_sfx = new Audio('./audio/hurt.mp3');
let hurt_shocked_sfx = new Audio('./audio/shocked.mp3');
let bubble_sfx = new Audio('./audio/bubble_shot.mp3');
let coin_sound = new Audio('./audio/coin.mp3');
let bottle_sound = new Audio('./audio/bottle.mp3');

function initMusic() {

    setVolume();

    let musicinterval = setInterval(() => {

        if (!bgMusicIsPlaying) {
            background_music.pause();
        } else if (bgMusicIsPlaying == true && world.endboss.hadFirstContact == false) {
            background_music.play();
        } else if (world.endboss.hadFirstContact == true) {
            background_music.pause();
            boss_music.play();
        }

        if (gameWin == true && !gameOver) {
            boss_music.pause();
            victory.play();
            clearInterval(musicinterval);

        } else if (gameOver == true && !gameWin) {
            background_music.pause();
            boss_music.pause();
            gamelost.play();
            clearInterval(musicinterval);
        }

    }, 100);
}

function setVolume() {
    background_music.volume = 0.1;
    boss_music.volume = 0.1;
    victory.volume = 0.1;
    swimming_sound.volume = .5;
    bubble_sfx.volume = .3;
    hurt_shocked_sfx.volume = .2;
    hurt_sfx.volume = 1;
    coin_sound.volume = .3;
    bottle_sound.volume = .5;
}