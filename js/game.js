let canvas;
let world;
let keyboard = new Keyboard();
let fullscreenState = false;
let helpisopen = false;

let background_music = new Audio('./audio/background_music.mp3');
background_music.volume = 0.1; //set audio volume
let isPlaying = false;

let intervalIds = [];
let i = 1;

function init() {
    canvas = document.getElementById('canvas');
    canvas.style.display = 'block';
    world = new World(canvas, keyboard,);
    // playBgMusic();
}

document.addEventListener('keydown', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 68) {
        keyboard.D = true;
    }
    if (e.keyCode == 70) {
        keyboard.F = true;
        fullscreen();
    }
    if (e.keyCode == 72) {
        keyboard.F = true;
        toggleHelp();
    }
});

document.addEventListener('keyup', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 38) {
        keyboard.UP = false;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (e.keyCode == 68) {
        keyboard.D = false;
    }
    if (e.keyCode == 70) {
        keyboard.F = false;
    }
    if (e.keyCode == 72) {
        keyboard.F = false;
    }
});

function playBgMusic() {
    background_music.play();
    isPlaying = true;
}

function togglePlay() {
    if (isPlaying) {
        background_music.pause()
    } else {
        background_music.play();
    }
};
background_music.onplaying = function () {
    background_music.volume = 0.1;
    isPlaying = true;
};
background_music.onpause = function () {
    isPlaying = false;
};


function fullscreen() {
    let fullscreen = document.getElementById('fullscreen');
    if (!fullscreenState) {
        fullscreenState = true;
        let fullscreenbutton = document.getElementById('fullscreen-button');
        fullscreenbutton.innerHTML = 'Exit fullscreen (F)';
        enterFullscreen(fullscreen);
        console.log(fullscreenState);
    } else {
        fullscreenState = false;
        console.log(fullscreenState);
        document.getElementById('fullscreen-button');

        exitFullscreen();
    }
}

function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

function toggleHelp() {
    let btn = document.getElementById('toggleHelp');
    let help = document.getElementById('HowToPlay');
    let full = document.getElementById('fullscreen');

    if (!helpisopen) {
        helpisopen = true;
        full.style.display = 'none';
        help.style.display = 'flex';
        btn.innerHTML = 'Close help (H)';
        console.log('helpisopen = ' + helpisopen);
    } else {
        helpisopen = false;
        help.style.display = 'none';
        full.style.display = 'block';
        btn.innerHTML = 'How to play (H)';
        console.log('helpisopen = ' + helpisopen);
    }


}
