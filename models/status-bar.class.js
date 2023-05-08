/**
 * Represents a generic object that can be moved.
 */
class statusBar extends Drawableobject {
    percentage;
    height = 50;
    width = 200;

    /**
     * Creates a new MovableObject instance.
     */
    constructor() {
        super();
    }

    /**
     * This function sets the percentage of a status bar and updates the image of the status bar to reflect the new percentage.
     * @param {*} percentage - The percentage to set (between 0 and 100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imgCache[path];
    }

    /**
     * Returns the index of the image to be displayed based on the percentage of the status bar
     * @returns {number} The index of the image to be displayed
     */
    resolveImageIndex() {
        if (this.percentage >= 100)
            return 5;
        else if (this.percentage > 80)
            return 4;
        else if (this.percentage > 60)
            return 3;
        else if (this.percentage > 40)
            return 2;
        else if (this.percentage > 10)
            return 1;
        else
            return 0;
    }
}