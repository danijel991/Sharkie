class Level {
    enemies;
    jellyfishes;
    endbosses;
    lights;
    coins;
    poisons;
    backgroundObjects;
    level_end_x = 720 * 3;

    constructor(enemies, jellyfishes, endbosses, lights, coins, poisons, backgroundObjects) {
        this.enemies = enemies;
        this.jellyfishes = jellyfishes;
        this.endbosses = endbosses;
        this.coins = coins;
        this.poisons = poisons;
        this.lights = lights;
        this.backgroundObjects = backgroundObjects;

    }
}