class Level {
    pufferfish;
    jellyfish;
    endboss;
    lights;
    coins;
    poisons;
    backgroundObjects;
    level_end_x = 720 * 3;

    constructor(pufferfish, jellyfish, endboss, lights, coins, poisons, backgroundObjects) {
        this.pufferfish = pufferfish;
        this.jellyfish = jellyfish;
        this.endboss = endboss;
        this.coins = coins;
        this.poisons = poisons;
        this.lights = lights;
        this.backgroundObjects = backgroundObjects;
    }
}