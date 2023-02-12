class Fish extends MovableObject {

    height = 120;
    width = 130;

    constructor() { //super wird geschrieben, wenn Methoden vom übergeordneten obejkt aufgerufen werden sollen
        super().loadImage('img/2.Enemy/1.Pufferfish/1.Swim/1.swim1.png');

        this.x = 200 + Math.random() * 400; //immer Zahl zwischen 200 und 700
    }




}