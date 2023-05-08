/**
 * Class for coin-bar
 */
class CoinBar extends statusBar {
  /**
   * The x-coordinate of the coin bar.
   * @type {number}
   */
  x = 255;

  /**
   * The y-coordinate of the coin bar.
   * @type {number}
   */
  y = 0;

  /**
   * The width of the coin bar.
   * @type {number}
   */
  width = 200;

  /**
   * The height of the coin bar.
   * @type {number}
   */
  height = 60;

  /**
   * The array of images for the coin bar.
   * @type {string[]}
   */
  IMAGES = [
    './img/4.Marks/green/Coin/0.png',
    './img/4.Marks/green/Coin/20.png',
    './img/4.Marks/green/Coin/40.png',
    './img/4.Marks/green/Coin/60.png',
    './img/4.Marks/green/Coin/80.png',
    './img/4.Marks/green/Coin/100.png'
  ];

  /**
    * This is a constructor function that initializes a new object. It calls the loadImages method with an argument of this.IMAGES and sets the percentage to 0 using the setPercentage method.
    */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.setPercentage(0);
  }

  /**
   * Sets the percentage of the coin bar based on the value of the collected coins.
   * @param {number} value - The value of the collected coins.
   */
  setPercentageValue(value) {
    this.setPercentage(value);
  }
}