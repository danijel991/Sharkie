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
let landscape = false;
let canvasover;
let bgMusicIsPlaying = true;
let sfxplay = true;
let i = 1;
let mobilescreen = false;
let canvasActive = false;

function onloadInit() {
    loadingScreen();
    mobileScreenListener();
}

function init() {
    addVariables();
    addStyles();
    initLevel();
    checkOrientation();
    checkGameOver();
    touchEventListener();
    mobileScreenListener();
    initSound();
    world = new World(level1, canvas, keyboard, assets);
}

function addVariables() {
    canvasover = document.getElementById('canvasOver');
    canvas = document.getElementById('canvas');
    winScreen = document.getElementById('winnerScreen');
    gOverScreen = document.getElementById('gameOverScreen');
    gameTitle = document.getElementById('gameTitle');
    restartGame = document.getElementById('restartBtn');
    gametogglebtn = document.getElementById('toggleGame');
}

function addStyles() {
    winScreen.style.display = 'none';
    gameTitle.style.display = 'none';
    canvasover.style.display = 'none';
    gametogglebtn.style.display = 'none';
    canvas.style.display = 'block';
}

function loadingScreen() {
    setTimeout(() => {
        document.getElementById('loadingscreen').style.display = 'none';
    }, 3000);
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

function togglePlay() {
    let musictoggle = document.getElementById('toggleMusic');

    if (bgMusicIsPlaying) {
        bgMusicIsPlaying = false;
        musictoggle.innerHTML = 'Music off';
    } else {
        bgMusicIsPlaying = true;
        musictoggle.innerHTML = 'Music on';
    }
}

function toggleSfx() {
    let sfxtoggle = document.getElementById('toggleSfx');

    if (sfxplay) {
        sfxplay = false;
        sfxtoggle.innerHTML = 'Sfx off';
    } else {
        sfxplay = true;
        sfxtoggle.innerHTML = 'Sfx on';
    }
}

function fullscreen() {
    let fullscreen = document.getElementById('fullscreen');
    if (!fullscreenState || mobilescreen || landscape) {
        fullscreenState = true;
        let fullscreenbutton = document.getElementById('fullscreen-button');
        fullscreenbutton.innerHTML = 'Exit fullscreen (F)';
        enterFullscreen(fullscreen);
    } else {
        fullscreenState = false;
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
        if (gameOver)
            gameIsOver();
        else if (gameWin)
            gameIsWIn()
    }, 100);
}

function gameIsOver() {
    canvas.style.display = 'none';
    winScreen.style.display = 'none';
    gOverScreen.style.display = 'block';
    restartGame.style.display = 'block';
}

function gameIsWIn() {
    canvas.style.display = 'none';
    gOverScreen.style.display = 'none';
    winScreen.style.display = 'block';
    restartGame.style.display = 'block';
}

function toggleHelp() {
    let btn = document.getElementById('toggleHelp');
    let btnopened = document.getElementById('helpbtnopened');
    let help = document.getElementById('HowToPlay');
    let full = document.getElementById('fullscreen');

    if (!helpisopen) {
        helpisopen = true;
        full.style.display = 'none';
        help.style.display = 'flex';
        btnopened.innerHTML = 'Close help';
    } else {
        helpisopen = false;
        help.style.display = 'none';
        full.style.display = 'flex';
        btn.innerHTML = 'How to play';
    }
}

function stopGame(vari) {
    setTimeout(() => {
        if (vari == 1) {
            gameWin = true;
        }
        else if (vari == 2) gameOver = true;
        else {
            winScreen.style.display = 'none';
            gameTitle.style.display = 'none';
        }
    }, 100);

    clearIntervals();

    gameTitle.style.display = 'block';
    restartGame.style.display = 'block';
    canvasover.style.display = 'block';
}
function clearIntervals() {
    clearInterval(world.character.animateIntervalId);
    clearInterval(world.character.keyboardIntervalId);
    world.level.jellyfish.forEach((jellyfish) =>  {
        clearInterval(jellyfish.animatedJellyFishId);
        clearInterval(jellyfish.animatedJellyFishIdDead);
        clearInterval(jellyfish.animatedJellyFishIdMotion);
    });
    world.level.pufferfish.forEach((pufferfish) => {
        clearInterval(pufferfish.fishMotionInterval)
    });
    clearInterval(world.endboss.endbossAnimation);
}

function mobileScreenListener() {
    let gametogglebtn = document.getElementById('toggleGame');
    let canvasblock = document.getElementById('canvas');
    let canvasober = document.getElementById('canvasOver');
    let toucharea_left = document.getElementById('touch-area-left');
    let toucharea_right = document.getElementById('touch-area-right');

    setInterval(() => {

        if (canvasblock.style.display != "block") {
            // canvasblock.style.display = "flex"
            toucharea_left.style.display = "none"
            toucharea_right.style.display = "none"

        } else if (canvasblock.style.display == "block") {
            toucharea_left.style.display = "flex"
            toucharea_right.style.display = "flex"
            gametogglebtn.style.display = "none";
            canvasober.style.display = "none";
        } else if (gameOver || gameWin) {
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
    setInterval(() => {
        if (window.matchMedia("(orientation: landscape)").matches) {
            if (window.innerHeight < 480) {
                newHeight = window.innerHeight;
                document.getElementById('canvas').style.height = `${newHeight}px`;
                landscape = true;
            }
        }
        else document.getElementById('canvas').style.height = `100%`;
        landscape = false;
    }, 1000);
}