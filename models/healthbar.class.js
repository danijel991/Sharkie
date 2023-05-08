/**
 * A class representing a health bar that extends from a statusBar.
 */
class HealthBar extends statusBar {
  x = 25;
  y = 0;
  width = 200;
  height = 60;
  /**
   * An array of image URLs for the health bar.
   * @type {string[]}
   */
  IMAGES = [
    './img/4.Marks/green/Life/0.png',
    './img/4.Marks/green/Life/20.png',
    './img/4.Marks/green/Life/40.png',
    './img/4.Marks/green/Life/60.png',
    './img/4.Marks/green/Life/80.png',
    './img/4.Marks/green/Life/100.png'
  ]

  /**
   * Constructs a new instance of HealthBar with initial percentage of 100.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.setPercentage(100);
  }
}