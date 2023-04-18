class CoinBar extends statusBar {
  x = 225;
  y = 0;
  IMAGES = [
    './img/4.Marks/green/Coin/0.png',
    './img/4.Marks/green/Coin/20.png',
    './img/4.Marks/green/Coin/40.png',
    './img/4.Marks/green/Coin/60.png',
    './img/4.Marks/green/Coin/80.png',
    './img/4.Marks/green/Coin/100.png'
  ];

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.setPercentage(0);
  }

  // You can add a method to update the percentage value
  setPercentageValue(value) {
    this.setPercentage(value);
  }
}