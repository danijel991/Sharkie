const level1 = new Level(
    [
        new PufferFish(),
        new PufferFish(),
        new PufferFish(),
        new JellyFish(),
        new JellyFish(),
        new JellyFish(),
    ],
    [
        new Endboss(),
    ],
    [
        new Light(),
    ],
    [
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
    ],
        [
        new Poisons(),
        new Poisons(),
        new Poisons(),
        new Poisons(),
        new Poisons(),
        new Poisons(),
        new Poisons(),
        new Poisons(),
        new Poisons(),
        new Poisons(),
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