class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.blocks = false;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  show(isInside=false) {
    if (isInside) {
      fill(255, 0, 0);
    }
    else if (this.blocks){
      fill(209,164,251);
    }
    else {
      fill(255);
    }

    rect(this.x, this.y, 50, 50);
  }

  block() {
    this.blocks = true;
  }

  unblock() {
    this.blocks = false;
  }
}
