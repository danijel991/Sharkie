class Level {
    enemies;
    endbosses;
    lights;
    coins;
    poisons;
    backgroundObjects;
    level_end_x = 720 * 3;

    constructor(enemies, endbosses, lights, coins, poisons, backgroundObjects) {
        this.enemies = enemies;
        this.endbosses = endbosses;
        this.coins = coins;
        this.poisons = poisons;
        this.lights = lights;
        this.backgroundObjects = backgroundObjects;

    }
}