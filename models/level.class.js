/**
 * Represents a game level.
 */
class Level {
    pufferfish;
    jellyfish;
    endboss;
    lights;
    coins;
    poisons;
    backgroundObjects;
    level_end_x = 720 * 3;

    /**
     * 
     * @param {*} pufferfish - The pufferfish object for the level.
     * @param {*} jellyfish - The jellyfish object for the level.
     * @param {*} endboss - The endboss object for the level.
     * @param {*} lights - The lights object for the level.
     * @param {*} coins - An array of coins in the level.
     * @param {*} poisons - An array of poisons in the level.
     * @param {*} backgroundObjects - An array of background objects in the level.
     */
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