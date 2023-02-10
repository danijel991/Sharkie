class MovableObject {
    x = 120;
    y = 250;
    img;
    height = 150;
    width = 100;

    loadImage(path) {
        this.img = new Image(); //ist das Gleiche wie <img=id"" src="">
        this.img.src = path;
    }

    moveRight() {
        console.log('moving right');
    }
    moveLeft() {

    }
}