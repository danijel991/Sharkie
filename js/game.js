let canvas;
let winScreen;
let gOverScreen;
let world;
let gameTitle;
let keyboard = new Keyboard();
let assets = new Assets();
let fullscreenState = false;
let helpisopen = false;
let gameOver = false;
let gameWin = false;
let background_music = new Audio('./audio/background_music.mp3');
background_music.volume = 0.1; //set audio volume
let bgMusicIsPlaying = false;
let stopedIntervals = false;
let intervalIds = [];
let i = 1;
let mobilescreen = false;

function init() {

    canvas = document.getElementById('canvas');
    winScreen = document.getElementById('winnerScreen');
    gOverScreen = document.getElementById('gameOverScreen');
    gameTitle = document.getElementById('gameTitle');

    world = new World(canvas, keyboard, assets);
    // playBgMusic();
    winScreen.style.display = 'none';
    gameTitle.style.display = 'none';
    canvas.style.display = 'block';
    checkGameOver();
    resetGame();
    gameWin = false;
    gameOver = false;
    touchEventListener();
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
    bgMusicIsPlaying = true;
}

function togglePlay() {
    if (bgMusicIsPlaying) {
        background_music.pause();
    } else {
        background_music.play();
    }
}

background_music.onplaying = function () {
    background_music.volume = 0.1;
    bgMusicIsPlaying = true;
};
background_music.onpause = function () {
    bgMusicIsPlaying = false;
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

function checkGameOver() {

    document.getElementById('toggleGame').innerHTML = 'Restart game';
    setInterval(() => {
        if (gameOver == true) {
            canvas.style.display = 'none';
            console.log('game over');
            winScreen.style.display = 'none';
            gOverScreen.style.display = 'block';
            gameOver = false;

        } else if (gameWin == true) {
            canvas.style.display = 'none';
            console.log('Winner');
            gOverScreen.style.display = 'none';
            winScreen.style.display = 'block';
            gameWin = false;
        }
        console.log('GameStatus Listener');
    }, 2000);
}

function resetGame() {

    if (gameOver == true || gameWin == true) {
        gOverScreen.style.display = 'none';
        winScreen.style.display = 'none';
        canvas.style.display = 'block';
    }

    gameOver = false;
    gameWin = false;
}

function toggleHelp() {
    let btn = document.getElementById('toggleHelp');
    let help = document.getElementById('HowToPlay');
    let full = document.getElementById('fullscreen');

    if (!helpisopen) {
        helpisopen = true;
        full.style.display = 'none';
        help.style.display = 'flex';
        btn.innerHTML = 'Close help';
        console.log('helpisopen = ' + helpisopen);
    } else {
        helpisopen = false;
        help.style.display = 'none';
        full.style.display = 'flex';
        btn.innerHTML = 'How to play';
        console.log('helpisopen = ' + helpisopen);
    }
}

function stopGame(vari) {
    setTimeout(() => {
        console.log("Ending Intervals");
        if (vari == 1) {
            gameWin = true;
        } else if (vari == 2) {
            gameOver = true;
        } else {
            winScreen.style.display = 'none';
            gameTitle.style.display = 'none'
        }
        clearInterval(world.checkCollisionID);
        clearInterval(world.checkCollisionCharacterID);
        clearInterval(world.checkCollisionObjectID);
        clearInterval(world.checkCollisionBallisticsID);
        clearInterval(world.character.animateIntervalId);
        clearInterval(world.character.keyboardIntervalId);
        clearInterval(world.character.spacePressed);
        clearInterval(world.character.DIsPressed);
        clearInterval(world.jellyfish.animatedJellyFishId);
        clearInterval(world.jellyfish.animatedJellyFishIdDead);
        clearInterval(world.jellyfish.animatedJellyFishIdMotion);
        clearInterval(world.pufferfish.fishMotionInterval);
        clearInterval(world.pufferfish.fishMotionIntervalDead);
        clearInterval(world.endboss.endbossAnimation);
        gameWin = false;
        gameTitle.style.display = 'block';
        stopedIntervals = true;

    }, 1000);

    setInterval(() => {
        if (gameWin = true) {
            setTimeout(() => {
                gameWin = false;
            }, 1000);

        }
    }, 400);
}

function mobileScreenListener() {
    let gametogglebtn = document.getElementById('toggleGame');
    let canvasOver = document.getElementById('canvasOver');
    let canvassub = document.getElementById('canvasSub');
    let canvasblock = document.getElementById('canvas');
    let playbuttons_left = document.getElementById('playButtonsLeft');

    setInterval(() => {
        if (window.innerWidth <= 720) {
            console.log('Mobile screen');
            mobilescreen = true;
        } else {
            console.log('big screen');
            mobilescreen = false;
        }

        if (canvasblock.style.display != "block") {
            gametogglebtn.style.display = "block"
            canvasOver.style.display = "flex"
            canvassub.style.display = "flex"
            console.log(' BLOCK');
        } else if (canvasblock.style.display != "block" || helpisopen == false) {

        } else {
            gametogglebtn.style.display = "none";
            canvasOver.style.display = "none";
            canvassub.style.display = "none";
            console.log('none');

        }
    }, 500);
}

function touchEventListener() {
    const arrowup = document.getElementById('touchbtn-up');
    const arrowleft = document.getElementById('touchbtn-left');
    const arrowdown = document.getElementById('touchbtn-down');
    const arrowright = document.getElementById('touchbtn-right');
    const bubbletouch = document.getElementById('bubbleAttackTouch');
    const slaptouch = document.getElementById('slapAttackTouch');

    arrowup.addEventListener('touchstart', (e) => {
        e.preventDefault();
        console.log('arrowup');
        keyboard.UP = true;
    });
    arrowup.addEventListener('touchend', (e) => {
        e.preventDefault();
        console.log('arrowup');
        keyboard.UP = false;
    });
    arrowleft.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    arrowleft.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });
    arrowright.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    arrowright.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });
    arrowdown.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.DOWN = true;
    });
    arrowdown.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.DOWN = false;
    });
    bubbletouch.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
    });
    bubbletouch.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    });
    slaptouch.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });
    slaptouch.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });



}