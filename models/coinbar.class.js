class CoinBar extends Statusbar {
    x = 10;
    y = 50;
    IMAGES = [
        'img/4.Marks/green/Coin/0.png',
        'img/4.Marks/green/Coin/20.png',
        'img/4.Marks/green/Coin/40.png',
        'img/4.Marks/green/Coin/60.png',
        'img/4.Marks/green/Coin/80.png',
        'img/4.Marks/green/Coin/100.png'
    ];
  
    constructor() {
      super();
      this.loadImages(this.IMAGES);
      this.setPercentage(0);
    }
  }