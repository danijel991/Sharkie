class Light extends MovableObject {
    x = 100;
    y = 0;
    width = 300;
    height = 250;

    constructor() { //super wird geschrieben, wenn Methoden vom übergeordneten obejkt aufgerufen werden sollen
        super().loadImage('img/3.Background/Layers/1._Light/1.png');
    }
}  