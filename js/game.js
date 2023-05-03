let canvas;
let winScreen;
let gOverScreen;
let world;
let gameTitle;
let restartGame;
let keyboard = new Keyboard();
let assets = new Assets();
let fullscreenState = false;
let helpisopen = false;
let gameOver = false;
let gameWin = false;
let canvasover;
let background_music = new Audio('./audio/background_music.mp3');
background_music.volume = 0.1; //set audio volume
let bgMusicIsPlaying = false;
let i = 1;
let mobilescreen = false;
let canvasActive = false;

function init() {
    canvasover = document.getElementById('canvasOver');
    canvas = document.getElementById('canvas');
    winScreen = document.getElementById('winnerScreen');
    gOverScreen = document.getElementById('gameOverScreen');
    gameTitle = document.getElementById('gameTitle');
    restartGame = document.getElementById('restartBtn');
    gametogglebtn = document.getElementById('toggleGame');
    winScreen.style.display = 'none';
    gameTitle.style.display = 'none';
    canvasover.style.display = 'none';
    gametogglebtn.style.display = 'none';
    canvas.style.display = 'block';
    initLevel();
    checkOrientation();
    world = new World(canvas, keyboard, assets);
    // playBgMusic();
    checkGameOver();
    touchEventListener();
    mobileScreenListener()
}

document.addEventListener('keydown', (e) => {
    if (e.keyCode == 39) keyboard.RIGHT = true;
    if (e.keyCode == 37) keyboard.LEFT = true;
    if (e.keyCode == 38) keyboard.UP = true;
    if (e.keyCode == 40) keyboard.DOWN = true;
    if (e.keyCode == 32) keyboard.SPACE = true;
    if (e.keyCode == 68) keyboard.D = true;
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
    if (e.keyCode == 39) keyboard.RIGHT = false;
    if (e.keyCode == 37) keyboard.LEFT = false;
    if (e.keyCode == 38) keyboard.UP = false;
    if (e.keyCode == 40) keyboard.DOWN = false;
    if (e.keyCode == 32) keyboard.SPACE = false;
    if (e.keyCode == 68) keyboard.D = false;
    if (e.keyCode == 70) keyboard.F = false;
    if (e.keyCode == 72) keyboard.F = false;
});

function playBgMusic() {
    background_music.play();
    bgMusicIsPlaying = true;
}

function togglePlay() {
    if (bgMusicIsPlaying) background_music.pause();
    else background_music.play();
}

background_music.onplaying = function () {
    background_music.volume = 0.1;
    bgMusicIsPlaying = true;
}
background_music.onpause = function () {
    bgMusicIsPlaying = false;
}

function fullscreen() {
    let fullscreen = document.getElementById('fullscreen');
    if (!fullscreenState || mobilescreen == true) {
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
    if (element.requestFullscreen) element.requestFullscreen();
    else if (element.msRequestFullscreen) element.msRequestFullscreen();
    else if (element.webkitRequestFullscreen) element.webkitRequestFullscreen();
}

function exitFullscreen() {
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
}

function checkGameOver() {

    document.getElementById('toggleGame').innerHTML = 'Restart game';

    setInterval(() => {
        if (gameOver == true) {
            canvas.style.display = 'none';
            winScreen.style.display = 'none';
            gOverScreen.style.display = 'block';
            restartGame.style.display = 'block';
        } else if (gameWin == true) {
            canvas.style.display = 'none';
            gOverScreen.style.display = 'none';
            winScreen.style.display = 'block';
            restartGame.style.display = 'block';
        }

    }, 100);
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
    } else {
        helpisopen = false;
        help.style.display = 'none';
        full.style.display = 'flex';
        btn.innerHTML = 'How to play';
    }
}

function stopGame(vari) {
    console.log("Ending Intervals");
    setInterval(() => {
        if (vari == 1) gameWin = true;
        else if (vari == 2) gameOver = true;
        else {
            winScreen.style.display = 'none';
            gameTitle.style.display = 'none';
        }
    }, 100);

    clerIntervals();

    gameTitle.style.display = 'block';
    restartGame.style.display = 'block';
}
function clerIntervals() {
    clearInterval(world.character.animateIntervalId);
    clearInterval(world.character.keyboardIntervalId);
    clearInterval(world.jellyfish.animatedJellyFishId);
    clearInterval(world.jellyfish.animatedJellyFishIdDead);
    clearInterval(world.jellyfish.animatedJellyFishIdMotion);
    clearInterval(world.pufferfish.fishMotionInterval);
    clearInterval(world.endboss.endbossAnimation);
}

function mobileScreenListener() {
    let gametogglebtn = document.getElementById('toggleGame');
    let canvasblock = document.getElementById('canvas');
    let canvasober = document.getElementById('canvasOver');
    let toucharea_left = document.getElementById('touch-area-left');
    let toucharea_right = document.getElementById('touch-area-right');

    setInterval(() => {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 720) {
            mobilescreen = true;
        } else mobilescreen = false;

        if (canvasblock.style.display != "block") {
            canvasober.style.display = "flex"
            toucharea_left.style.display = "none"
            toucharea_right.style.display = "none"
        } else if (canvasblock.style.display == "block") {
            toucharea_left.style.display = "flex"
            toucharea_right.style.display = "flex"
            gametogglebtn.style.display = "none";
            canvasober.style.display = "none";
        } else if (gameOver == true || gameWin == true) {
            toucharea_left.style.display = "none"
            toucharea_right.style.display = "none"
        }
    }, 100)
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
        keyboard.UP = true;
    });
    arrowup.addEventListener('touchend', (e) => {
        e.preventDefault();

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

function checkOrientation() {
    if (window.matchMedia("(orientation: landscape)").matches) {
        if (window.innerHeight < 480) {
            newHeight = window.innerHeight;
            document.getElementById('canvas').style.height = `${newHeight}px`;
        }
    }
    else document.getElementById('canvas').style.height = `100%`;
}