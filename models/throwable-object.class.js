class ThrowableObject extends MovableObject {
    constructor() {
        super().loadImage('img/1.Sharkie/4.Attack/Bubble_trap/Bubble.png');
        this.x = 100;
        this.y = 100;
        this.width = 50;
        this.height = 50;
        this.throw(100, 150);
    }

    throw(x, y) {
        this.x = x;
        this.y = y;
        this.speedY = 30;
        setInterval(() => {
            this.x += 10;
        }, 25);
    }
}