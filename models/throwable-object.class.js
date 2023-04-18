class ThrowableObject extends MovableObject {

    constructor(x, y) {
        super().loadImage('./img/1.Sharkie/4.Attack/Bubble_trap/Bubble.png');
        this.x = x;
        this.y = y;
        this.height = 40;
        this.width = 40;
        this.throw();
    }

    throw() {
        setInterval(() => {
            this.x += 5;
        }, 1000 / 60);
    }
}