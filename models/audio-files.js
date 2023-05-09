/**
 * Define all sound files
 */
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
  