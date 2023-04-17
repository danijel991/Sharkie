class Level {
    enemies;
    lights;
    coins;
    backgroundObjects;
    level_end_x = 720 * 3;

    constructor(enemies, lights, coins, backgroundObjects) {
        this.enemies = enemies;
        this.lights = lights;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        // this.poisons = poisons;

    }
}