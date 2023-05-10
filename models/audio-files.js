let bgMusicIsPlaying = true;
let sfxplay = true;

const sounds = {
  background_music: new Audio('./audio/background_music.mp3'),
  boss_music: new Audio('./audio/endboss_fight.mp3'),
  victory: new Audio('./audio/victory.mp3'),
  gamelost: new Audio('./audio/game_over.mp3'),
  swimming_sound: new Audio('./audio/char_swim.mp3'),
  hurt_sfx: new Audio('./audio/hurt.mp3'),
  hurt_shocked_sfx: new Audio('./audio/shocked.mp3'),
  bubble_sfx: new Audio('./audio/bubble_shot.mp3'),
  coin_sound: new Audio('./audio/coin.mp3'),
  bottle_sound: new Audio('./audio/bottle.mp3'),
  slap_sfx: new Audio('./audio/slap.mp3')
};

/**
 * Depending on the game event the background music changes
 */
function initSound() {
  // Check for stored settings and use them if available
  if (localStorage.getItem('bgMusicIsPlaying') !== null) {
    bgMusicIsPlaying = JSON.parse(localStorage.getItem('bgMusicIsPlaying'));
  }
  if (localStorage.getItem('sfxplay') !== null) {
    sfxplay = JSON.parse(localStorage.getItem('sfxplay'));
  }

  setVolume();

  const musicinterval = setInterval(() => {
    if (!bgMusicIsPlaying) {
      sounds.background_music.pause();
    } else if (bgMusicIsPlaying && !world.endboss.hadFirstContact) {
      sounds.background_music.play();
    } else if (world.endboss.hadFirstContact) {
      sounds.background_music.pause();
      sounds.boss_music.play();
    }

    if (gameWin && !gameOver) {
      sounds.boss_music.pause();
      sounds.victory.play();
      clearInterval(musicinterval);
    } else if (gameOver && !gameWin) {
      sounds.background_music.pause();
      sounds.boss_music.pause();
      sounds.gamelost.play();
      clearInterval(musicinterval);
    }
  }, 100);

  setInterval(() => {
    if (!sfxplay) {
      setSfxVolume(0);
    } else if (sfxplay) {
      setSfxVolume(1);
    }
  }, 100);
}

/**
 * Changes the volume of all sound effects
 * @param {number} volume - The volume to set for all sound effects
 */
function setSfxVolume(volume) {
  Object.values(sounds).forEach((sound) => {
    if (sound !== sounds.background_music && sound !== sounds.boss_music) {
      sound.volume = volume;
    }
  });
}

/**
 * Changes the volume of the background music and boss music
 */
function setVolume() {
  sounds.background_music.volume = 0.1;
  sounds.boss_music.volume = 0.1;
  sounds.victory.volume = 0.1;
}

/**
* Toggles music on or off & saves it to localStorage
*/
function toggleMusic() {
  bgMusicIsPlaying = !bgMusicIsPlaying;
  document.getElementById('toggleMusic').innerHTML = bgMusicIsPlaying ? 'Music on' : 'Music off';

  localStorage.setItem('bgMusicIsPlaying', JSON.stringify(bgMusicIsPlaying));
}

/**
* Toggles sfx on or off & saves it to localStorage
*/
function toggleSfx() {
  sfxplay = !sfxplay;
  document.getElementById('toggleSfx').innerHTML = sfxplay ? 'Sfx on' : 'Sfx off';

  localStorage.setItem('sfxplay', JSON.stringify(sfxplay));
}

/**
 * Call the function to update the buttons on page load
 */
function updateButtons() {

  if (localStorage.getItem('bgMusicIsPlaying') !== null) {
    bgMusicIsPlaying = JSON.parse(localStorage.getItem('bgMusicIsPlaying'));
    document.getElementById('toggleMusic').innerHTML = bgMusicIsPlaying ? 'Music on' : 'Music off';
  }
  if (localStorage.getItem('sfxplay') !== null) {
    sfxplay = JSON.parse(localStorage.getItem('sfxplay'));
    document.getElementById('toggleSfx').innerHTML = sfxplay ? 'Sfx on' : 'Sfx off';
  }
}
