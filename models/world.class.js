class World {
    character = new Character();
    enemies = [
        new Fish(),
        new Fish(),
        new Fish(),
    ];
    lights = [
        new Light()
    ];
    floors = [
        new Floor()
    ];
    backgroundObjects = [
        new backgroundObject('img/3.Background/Layers/5._Water/D1.png', 0),
        new backgroundObject('img/3.Background/Layers/3._Fondo 1/D1.png', 0),
        new backgroundObject('img/3.Background/Layers/4._Fondo 2/D1.png', 0)
    ];
    canvas;
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);



        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.floors);
        this.addObjectsToMap(this.lights);
        this.addObjectsToMap(this.enemies);
        this.addToMap(this.character);



        let self = this;
        requestAnimationFrame(function () { //sobald alles darüber geladen wurde, wird das hier gezeichnet (asynchron)
            self.draw(); //this wird hier nicht erkannt, deswegen wird staattessen self als variable vergeben
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }
}