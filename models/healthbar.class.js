class HealthBar extends Statusbar {
    x = 10;
    y = 0;
    IMAGES = [
      'img/4.Marks/green/Life/0.png',
      'img/4.Marks/green/Life/20.png',
      'img/4.Marks/green/Life/40.png',
      'img/4.Marks/green/Life/60.png',
      'img/4.Marks/green/Life/80.png',
      'img/4.Marks/green/Life/100.png'
  ];
  
    constructor() {
      super();
      this.loadImages(this.IMAGES);
      this.setPercentage(100);
    }
  }