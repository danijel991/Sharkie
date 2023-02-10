class Floor extends MovableObject {
    x = 0;
    y = 180;
    width = 720;
    height = 300;

    constructor() { //super wird geschrieben, wenn Methoden vom übergeordneten obejkt aufgerufen werden sollen
        super().loadImage('img/3.Background/Layers/2._Floor/D1.png');
    }
}  