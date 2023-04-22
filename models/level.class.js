class Level {
    pufferfishes;
    jellyfishes;
    endbosses;
    lights;
    coins;
    poisons;
    backgroundObjects;
    level_end_x = 720 * 3;

    constructor(pufferfishes, jellyfishes, endbosses, lights, coins, poisons, backgroundObjects) {
        this.pufferfishes = pufferfishes;
        this.jellyfishes = jellyfishes;
        this.endbosses = endbosses;
        this.coins = coins;
        this.poisons = poisons;
        this.lights = lights;
        this.backgroundObjects = backgroundObjects;

    }
}