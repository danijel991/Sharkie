/**
The canvas element.
@type {HTMLElement}
*/
let canvas;
/**
The element for the win screen.
@type {HTMLElement}
*/
let winScreen;
/**
The element for the game over screen.
@type {HTMLElement}
*/
let gOverScreen;
/**
The world object.
@type {World}
*/
let world;
/**
The element for the game title.
@type {HTMLElement}
*/
let gameTitle;
/**
The element for the restart game button.
@type {HTMLElement}
*/
let restartGame;
/**
The keyboard object.
@type {Keyboard}
*/
let keyboard = new Keyboard();
/**
The assets object.
@type {Assets}
*/
let assets = new Assets();
/**
The state of the fullscreen mode.
@type {boolean}
*/
let fullscreenState = false;
/**
The state of the help window.
@type {boolean}
*/
let helpisopen = false;
/**
The state of the game over screen.
@type {boolean}
*/
let gameOver = false;
/**
The state of the game win screen.
@type {boolean}
*/
let gameWin = false;
/**
The state of the landscape mode.
@type {boolean}
*/
let landscape = false;
/**
The canvas element for the game over screen.
@type {HTMLElement}
*/
let canvasover;
/**
The state of the background music.
@type {boolean}
*/
let bgMusicIsPlaying = true;
/**
The state of the sound effects.
@type {boolean}
*/
let sfxplay = true;
/**
The state of the mobile screen.
@type {boolean}
*/
let mobilescreen = false;

/**
 * checks if game is running
 */
let gameIsRunnung = false;

/**
 * Initializes the game on page load.
 */
function onloadInit() {
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
function init() { //this is onclick
    addStyles();
    checkGameOver();
    initAssetMotion();
    initSound();
    gameIsRunnung = true;
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
    canvas = document.getElementById('canvas');
    winScreen = document.getElementById('winnerScreen');
    gOverScreen = document.getElementById('gameOverScreen');
    gameTitle = document.getElementById('gameTitle');
    restartGame = document.getElementById('restartBtn');
    gametogglebtn = document.getElementById('toggleGame');
    
}

/**
 * Adds the respective styles
 */
function addStyles() {
    winScreen.style.display = 'none';
    gameTitle.style.display = 'none';
    canvasover.style.display = 'none';
    gametogglebtn.style.display = 'none';
    canvas.style.display = 'block';
}

/**
 * Exits the loading screen only when all conditions are met/assets are loaded
 */
function checkLoaded() {
    if (world.character && world.endboss && level1.pufferfish && level1.jellyfish && level1.poisons && level1.coins && level1.backgroundObjects) {
        document.getElementById('loadingscreen').style.display = 'none';
    }
}

/**
 * Toggles music on or off
 */
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

/**
 * Toggles sfx on or off
 */
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

/**
 * Toggles fullscreen on or off
 */
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

/**
 * Depending on the boolean of the end of the game, the following function is retrieved
 * @param {boolean} gameWin - Whether the game has been won or not.
 * @param {boolean} gameOver - Whether the game is over or not.
 */
function checkGameOver() {
    document.getElementById('toggleGame').innerHTML = 'Restart game';
    setInterval(() => {
        if (gameOver)
            gameIsOver();
        else if (gameWin)
            gameIsWIn()
    }, 5000);
}

/**
 * Depending on the game end the styling in question
 */
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

/**
 * Open the game instructions
 */
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

/**
 * Depending on the end of the game the respective boolean will be set to true, until then the win- and gameover screen will be hidden 
 * @param {*} vari - 1 = game won, 2 = game lost
 */
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
    let gametogglebtn = document.getElementById('toggleGame');
    let canvasober = document.getElementById('canvasOver');
    let canvasoberober = document.getElementById('canvasOverOver');
    let tglethngs = document.getElementById('toggleThings');
    let toucharea_left = document.getElementById('touch-area-left');
    let toucharea_right = document.getElementById('touch-area-right');

    setInterval(() => {

        if (gameIsRunnung == false) {
            toucharea_left.style.display = "none"
            toucharea_right.style.display = "none"
        } else if (gameIsRunnung == true && landscape == true) {
            toucharea_left.style.display = "flex"
            toucharea_right.style.display = "flex"
            gametogglebtn.style.display = "none";
            canvasober.style.display = "none";
            canvasoberober.style.display = "none";
            tglethngs.style.display = "none";
        } else if (gameIsRunnung == true) {
            toucharea_left.style.display = "flex"
            toucharea_right.style.display = "flex"
            gametogglebtn.style.display = "none";
            canvasober.style.display = "none";

            tglethngs.style.flexDirection = "row";
        } else if (gameOver || gameWin) {
            toucharea_left.style.display = "none"
            toucharea_right.style.display = "none"
            gameTitle.style.display = "none"
            tglethngs.style.display = "none"
        }
    }, 100)
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

/**
 * Checks whether the device is in portrait or landscape format
 */
function checkOrientation() {
    setInterval(() => {
        if (window.matchMedia("(orientation: landscape)").matches) {
            if (window.innerHeight < 480 || window.innerWidth < 720) {
                newHeight = window.innerHeight;
                document.getElementById('canvas').style.height = `${newHeight}px`;
                landscape = true;
            } else {
                landscape = false;
            }
        } else {
            document.getElementById('canvas').style.height = `100%`;
            landscape = false;
        }
    }, 500);
}
