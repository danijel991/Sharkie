class ThrowableObject extends MovableObject {
    constructor(x, y) {
        super().loadImage('img/1.Sharkie/4.Attack/Bubble_trap/Bubble.png');
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.throw();
    }

    throw() {
        this.speedY = 30;
        setInterval(() => {
            this.x += 10;
        }, 25);
    }
}