let canvas;
let winScreen;
let gOverScreen;
let world;
let gameTitle;
let restartGame;
let gametogglebtn;
let canvasover;
let canvasoberober;
let btn;
let btnopened;
let help;
let full;
let tglethngs;
let toucharea_left;
let toucharea_right;
let keyboard = new Keyboard();
const assets = new Assets();
let fullscreenState = false;
let helpisopen = false;
let gameOver = false;
let gameWin = false;
let landscape = false;
let mobilescreen = false;
let gameIsRunning = false;
/**
 * Initializes the game on page load.
 */
function onloadInit() {
    updateButtons();
    mobileScreenListener();
    touchEventListener();
    addVariables();
    initLevel();
    world = new World(level1, canvas, keyboard, assets);
    world.preLoad();
    checkLoaded();
    checkOrientation();
}
/**
 * Loads all functions after start the game
 */
function init() {
    addStyles();
    checkGameOver();
    initAssetMotion();
    initSound();
    gameIsRunning = true;
}
/**
 * Starts motion of assets
 */
function initAssetMotion() {
    world.character.animate();
    world.endboss.introListener();
    level1.pufferfish.forEach(function (pufferfish) {
        pufferfish.animate();
    });
    level1.jellyfish.forEach(function (jellyfish) {
        jellyfish.animate();
    });
    level1.poisons.forEach(function (poisons) {
        poisons.animate();
    });
    level1.coins.forEach(function (coins) {
        coins.animate();
    });
}
/**
 * Adds the respective variables 
 */
function addVariables() {
    canvasover = document.getElementById('canvasOver');
    canvasoberober = document.getElementById('canvasOverOver');
    canvas = document.getElementById('canvas');
    winScreen = document.getElementById('winnerScreen');
    gOverScreen = document.getElementById('gameOverScreen');
    gameTitle = document.getElementById('gameTitle');
    restartGame = document.getElementById('restartBtn');
    gametogglebtn = document.getElementById('toggleGame');
    btn = document.getElementById('toggleHelp');
    btnopened = document.getElementById('helpbtnopened');
    help = document.getElementById('HowToPlay');
    full = document.getElementById('fullscreen');
    tglethngs = document.getElementById('toggleThings');
    toucharea_left = document.getElementById('touch-area-left');
    toucharea_right = document.getElementById('touch-area-right');
}
/**
 * Adds the respective styles
 */
function addStyles() {
    [winScreen, gameTitle, canvasover, gametogglebtn].forEach(el => el.style.display = 'none');
    canvas.style.display = 'block';
}
/**
 * Exits the loading screen only when all conditions are met/assets are loaded
 */
function checkLoaded() {
    const assetsLoaded = world.character && world.endboss && level1.pufferfish && level1.jellyfish && level1.poisons && level1.coins && level1.backgroundObjects;
    if (assetsLoaded) {
        document.getElementById('loadingscreen').style.display = 'none';
    }
}
/**
 * Toggles fullscreen on or off
 */
function fullscreen() {
    let fullscreen = document.getElementById('fullscreen');
    let fullscreenbutton = document.getElementById('fullscreen-button');
    fullscreenState = (!fullscreenState || mobilescreen || landscape);
    fullscreenbutton.innerHTML = (fullscreenState) ? 'Exit fullscreen (F)' : 'Fullscreen (F)';
    (fullscreenState) ? requestFullscreen(fullscreen) : exitFullscreen();
}

function requestFullscreen(element) {
    let funcs = ['requestFullscreen', 'msRequestFullscreen', 'webkitRequestFullscreen'];
    for (let i = 0; i < funcs.length; i++) {
        if (element[funcs[i]]) {
            element[funcs[i]]();
            break;
        }
    }
}

function exitFullscreen() {
    let funcs = ['exitFullscreen', 'webkitExitFullscreen'];
    for (let i = 0; i < funcs.length; i++) {
        if (document[funcs[i]]) {
            document[funcs[i]]();
            break;
        }
    }
}
/**
 * Depending on the boolean of the end of the game, the following function is retrieved
 */
function checkGameOver() {
    gametogglebtn.innerHTML = 'Restart game';
    setInterval(() => {
        if (gameOver || gameWin) {
            changeGameOverScreen(gameWin, gameOver);
        }
    }, 5000);
}
/**
 * Changes the game over screen depending on whether the game was won or lost.
 * @param {boolean} gameWin - Whether the game has been won or not.
 * @param {boolean} gameOver - Whether the game is over or not.
 */
function changeGameOverScreen(gameWin, gameOver) {
    let canvasDisplay = 'none';
    let winScreenDisplay = 'none';
    let gameOverScreenDisplay = 'none';

    if (gameOver) {
        gameOverScreenDisplay = 'block';
    } else if (gameWin) {
        winScreenDisplay = 'block';
    }
    canvas.style.display = canvasDisplay;
    winScreen.style.display = winScreenDisplay;
    gOverScreen.style.display = gameOverScreenDisplay;
    restartGame.style.display = 'block';
}
/**
 * Open the game instructions
 */
function toggleHelp() {

    if (!helpisopen) {
        helpisopen = true;
        full.style.display = 'none';
        help.style.display = 'flex';
        btnopened.textContent = 'Close help';
    } else {
        helpisopen = false;
        help.style.display = 'none';
        full.style.display = 'flex';
        btn.textContent = 'How to play';
    }
}
/**
 * Depending on the end of the game the respective boolean will be set to true, until then the win- and gameover screen will be hidden 
 * @param {*} vari - 1 = game won, 2 = game lost
 */
function stopGame(vari) {
    setTimeout(() => {
        if (vari === 1) {
            gameWin = true;
        } else if (vari === 2) {
            gameOver = true;
        } else {
            winScreen.style.display = 'none';
            gameTitle.style.display = 'none';
        }
    }, 100);

    clearIntervals();

    gameTitle.style.display = 'block';
    restartGame.style.display = 'block';
    canvasover.style.display = 'block';
}
/**
 * The intervals after the end of the game in the game are ended
 */
function clearIntervals() {
    clearInterval(world.character.animateIntervalId);
    clearInterval(world.character.keyboardIntervalId);
    world.level.jellyfish.forEach((jellyfish) => {
        clearInterval(jellyfish.animatedJellyFishId);
        clearInterval(jellyfish.animatedJellyFishIdDead);
        clearInterval(jellyfish.animatedJellyFishIdMotion);
    });
    world.level.pufferfish.forEach((pufferfish) => {
        clearInterval(pufferfish.fishMotionInterval)
    });
    clearInterval(world.endboss.endbossAnimation);
}
/**
 * Checks if the game is running on a small device to add touch buttons.
 */
function mobileScreenListener() {
    // const gametogglebtn = document.getElementById('toggleGame');

    function hideTouchAreas() {
        toucharea_left.style.display = 'none';
        toucharea_right.style.display = 'none';
    }

    function showTouchAreas() {
        toucharea_left.style.display = 'flex';
        toucharea_right.style.display = 'flex';
    }

    function hideElements() {
        gametogglebtn.style.display = 'none';
        canvasover.style.display = 'none';
        canvasoberober.style.display = 'none';
        tglethngs.style.display = 'none';
    }

    function showElements() {
        gametogglebtn.style.display = 'none';
        canvasover.style.display = 'none';
        tglethngs.style.flexDirection = 'row';
    }

    function hideGameTitle() {
        gameTitle.style.display = 'none';
    }

    setInterval(() => {
        if (!gameIsRunning) {
            hideTouchAreas();
        } else if (gameIsRunning && landscape) {
            showTouchAreas();
            hideElements();
        } else if (gameIsRunning) {
            showTouchAreas();
            hideGameTitle();
            showElements();
        } else if (gameOver || gameWin) {
            hideTouchAreas();
            hideGameTitle();
            tglethngs.style.display = 'none';
        }
    }, 100);
}
/**
 * Keyboard key listener
 */
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
/**
 * Display Touch keys listener
 */
function touchEventListener() {
    const keyboardButtons = {
        arrowup: {
            key: 'UP',
            element: document.getElementById('touchbtn-up'),
        },
        arrowleft: {
            key: 'LEFT',
            element: document.getElementById('touchbtn-left'),
        },
        arrowdown: {
            key: 'DOWN',
            element: document.getElementById('touchbtn-down'),
        },
        arrowright: {
            key: 'RIGHT',
            element: document.getElementById('touchbtn-right'),
        },
        bubbletouch: {
            key: 'D',
            element: document.getElementById('bubbleAttackTouch'),
        },
        slaptouch: {
            key: 'SPACE',
            element: document.getElementById('slapAttackTouch'),
        },
    };

    function handleTouchEvent(e, button) {
        e.preventDefault();
        keyboard[button.key] = e.type === 'touchstart';
    }

    Object.values(keyboardButtons).forEach((button) => {
        const { element, key } = button;
        element.addEventListener('touchstart', (e) => handleTouchEvent(e, button));
        element.addEventListener('touchend', (e) => handleTouchEvent(e, button));
    });
}
/**
 * Checks whether the device is in portrait or landscape format
 */
function checkOrientation() {
    setInterval(() => {
        if (window.matchMedia("(orientation: landscape)").matches) {
            if (window.innerHeight < 480 || window.innerWidth < 720) {
                newHeight = window.innerHeight;
                canvas.style.height = `${newHeight}px`;
                landscape = true;
            } else {
                landscape = false;
            }
        } else {
            canvas.style.height = `100%`;
            landscape = false;
        }
    }, 500);
}