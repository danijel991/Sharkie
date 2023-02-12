class Light extends MovableObject {
    width = 300;
    height = 250;
    y = 0;

    constructor() { //super wird geschrieben, wenn Methoden vom übergeordneten obejkt aufgerufen werden sollen
        super().loadImage('img/3.Background/Layers/1._Light/1.png');
        this.x = 422.5;
    }
}  