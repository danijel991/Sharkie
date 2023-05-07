class Poisonbar extends statusBar {
  x = 475;
  y = 0;
  width = 200;
  height = 60;
  IMAGES = [
    './img/4.Marks/green/poisoned_bubbles/0.png',
    './img/4.Marks/green/poisoned_bubbles/20.png',
    './img/4.Marks/green/poisoned_bubbles/40.png',
    './img/4.Marks/green/poisoned_bubbles/60.png',
    './img/4.Marks/green/poisoned_bubbles/80.png',
    './img/4.Marks/green/poisoned_bubbles/100.png'
  ];

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.setPercentage(0);
  }
}