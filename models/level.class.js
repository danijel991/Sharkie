class Level {
    enemies;
    collectableObjects;
    lights;
    backgroundObjects;
    level_end_x = 720 * 3;

    constructor(enemies, collectableObjects, lights, backgroundObjects) {
        this.enemies = enemies;
        this.coins = collectableObjects;
        this.lights = lights;
        this.backgroundObjects = backgroundObjects;

    }
}