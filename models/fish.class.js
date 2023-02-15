class Fish extends MovableObject {

    height = 120;
    width = 130;

    images_enemy = [
        'img/2.Enemy/1.Pufferfish/1.Swim/1.swim1.png',
        'img/2.Enemy/1.Pufferfish/1.Swim/1.swim2.png',
        'img/2.Enemy/1.Pufferfish/1.Swim/1.swim3.png',
        'img/2.Enemy/1.Pufferfish/1.Swim/1.swim4.png',
        'img/2.Enemy/1.Pufferfish/1.Swim/1.swim5.png'
    ];

    constructor() { //super wird geschrieben, wenn Methoden vom übergeordneten obejkt aufgerufen werden sollen
        super().loadImage('img/2.Enemy/1.Pufferfish/1.Swim/1.swim1.png');
        this.loadImages(this.images_enemy);
        this.x = 200 + Math.random() * 400 - 1; //immer Zahl zwischen 200 und 700
        this.speed = 0.15 + Math.random() * 0.15;
        this.animate();
    }

    animate() {
        this.moveLeft();
        setInterval(() => {
            let i = this.currentImage % this.images_enemy.length;
            let path = this.images_enemy[i];
            this.img = this.imgCache[path];
            this.currentImage++;
        }, 1000);
    }
}