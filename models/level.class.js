class Level {
    enemies;
    coins;
    lights;
    backgroundObjects;
    level_end_x = 720 * 3;

    constructor(enemies, coins, lights, backgroundObjects) {
        this.enemies = enemies;
        this.coins = coins;
        this.lights = lights;
        this.backgroundObjects = backgroundObjects;

    }
}