class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.blocks = false;
    this.start = false;
    this.end = false;
    this.pressed = false;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  show(isInside=false) {
    if (isInside && !this.start  && !this.end) {
      fill(220,220,220);
    }
    else if (this.start) {
      fill(124,252,0);
    }
    else if (this.end) {
      fill(255, 0 , 0);
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
    if (!this.start && !this.end) {
      this.blocks = true;
    }
  }

  unblock() {
    this.blocks = false;
  }

// perhaps have this function take an array and return an array of neighbors?
  touches(cell) {
    return (abs(this.x - cell.x) === 50 || abs(this.y - cell.y)  === 50)
  }
}
