let level1;

function initLevel() {

    level1 = new Level(
        [
            new PufferFish(350, 200),
            new PufferFish(750, 250),
            new PufferFish(1200, 150),

        ],
        [
            new JellyFish(500, 150),
            new JellyFish(950, 200),
            new JellyFish(1300, 250),
        ],
        [
            new Endboss(),
        ],
        [
            new Light(),
        ],
        [
            new Coins(250, 200),
            new Coins(250 * 2, 250),
            new Coins(250 * 3, 300),
            new Coins(250 * 4, 250),
            new Coins(250 * 5, 200),
            new Coins(250 * 6, 300),
            new Coins(250 * 7, 200),
        ],
        [
            new Poisons(300, 300),
            new Poisons(450, 250),
            new Poisons(600, 200),
            new Poisons(750, 250),
            new Poisons(900, 300),
            new Poisons(1050, 250),
            new Poisons(1200, 200),
            new Poisons(1350, 250),
            new Poisons(1500, 300),
            new Poisons(1650, 250),
        ],
        [
            new backgroundObject('./img/3.Background/Layers/5._Water/D2.png', -720),
            new backgroundObject('./img/3.Background/Layers/3._Fondo 1/D2.png', -720),
            new backgroundObject('./img/3.Background/Layers/4._Fondo 2/D2.png', -720),
            new backgroundObject('./img/3.Background/Layers/2._Floor/D2.png', -720),

            new backgroundObject('./img/3.Background/Layers/5._Water/D1.png', 0),
            new backgroundObject('./img/3.Background/Layers/3._Fondo 1/D1.png', 0),
            new backgroundObject('./img/3.Background/Layers/4._Fondo 2/D1.png', 0),
            new backgroundObject('./img/3.Background/Layers/2._Floor/D1.png', 0),

            new backgroundObject('./img/3.Background/Layers/5._Water/D2.png', 720),
            new backgroundObject('./img/3.Background/Layers/3._Fondo 1/D2.png', 720),
            new backgroundObject('./img/3.Background/Layers/4._Fondo 2/D2.png', 720),
            new backgroundObject('./img/3.Background/Layers/2._Floor/D2.png', 720),

            new backgroundObject('./img/3.Background/Layers/5._Water/D1.png', 720 * 2),
            new backgroundObject('./img/3.Background/Layers/3._Fondo 1/D1.png', 720 * 2),
            new backgroundObject('./img/3.Background/Layers/4._Fondo 2/D1.png', 720 * 2),
            new backgroundObject('./img/3.Background/Layers/2._Floor/D1.png', 720 * 2),

            new backgroundObject('./img/3.Background/Layers/5._Water/D2.png', 720 * 3),
            new backgroundObject('./img/3.Background/Layers/3._Fondo 1/D2.png', 720 * 3),
            new backgroundObject('./img/3.Background/Layers/4._Fondo 2/D2.png', 720 * 3),
            new backgroundObject('./img/3.Background/Layers/2._Floor/D2.png', 720 * 3),

            new backgroundObject('./img/3.Background/Layers/5._Water/D1.png', 720 * 4),
            new backgroundObject('./img/3.Background/Layers/3._Fondo 1/D1.png', 720 * 4),
            new backgroundObject('./img/3.Background/Layers/4._Fondo 2/D1.png', 720 * 4),
            new backgroundObject('./img/3.Background/Layers/2._Floor/D1.png', 720 * 4)
        ],
    );
}
