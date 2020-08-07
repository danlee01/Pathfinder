class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.blocks = false;
    this.start = false;
    this.end = false;
    this.pressed = false;

    // TEST Pathfinder
    // Will need to add logic in show()
    this.discovered = false;
    this.parent = null;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  getCenterX() {
    return this.x + 25;
  }

  getCenterY() {
    return this.y + 25;
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

  touches(cell) {
    // return (abs(this.x - cell.x) === 50 || abs(this.y - cell.y)  === 50)
    let distance = dist(this.x, this.y, cell.x, cell.y);

    // Calculate coordinates of diagonal cells
    let rightX = this.x + 50;
    let topY = this.y - 50;
    let leftX = this.x - 50;
    let botY = this.y + 50;

    // Check if cell is a diagonal
    let topRight = (cell.x === rightX && cell.y === topY);
    let topLeft = (cell.x === leftX && cell.y === topY);
    let botRight = (cell.x === rightX && cell.y === botY);
    let botLeft = (cell.x === leftX && cell.y === botY);

    return (distance === 50 || topRight || topLeft || botRight || botLeft);
  }

  getNeighbors(cells) {
    let neighbors = [];
    let orderedNeighbors = [];

    for (let cell of cells) {
      if (this.touches(cell)) {
        neighbors.push(cell);
      }
    }

    // Sort neighbors so we get the following arrangement
    // [right, topRight, top, topLeft, left, botleft, bot, botRight]
    // The following will be ugly and hardcoded =(
    let rightX = this.x + 50;
    let topY = this.y - 50;
    let leftX = this.x - 50;
    let botY = this.y + 50;


    /*
    let right = neighbors.forEach(neighbor => (right || (neighbor.x === rightX && neighbor.y === this.y)));
    let topRight = neighbors.forEach(neighbor => (topRight || (neighbor.x === rightX && neighbor.y === topY)));
    let top = neighbors.forEach(neighbor => (top || (neighbor.x === this.x && neighbor.y === topY)));
    let topLeft = neighbors.forEach(neighbor => (topLeft || (neighbor.x === leftX && neighbor.y === topY)));
    let left = neighbors.forEach(neighbor => (left || (neighbor.x === leftX && neighbor.y === this.y)));
    let botLeft = neighbors.forEach(neighbor => (botLeft || (neighbor.x === leftX && neighbor.y === botY)));
    let bot = neighbors.forEach(neighbor => (bot || (neighbor.x === this.x && neighbor.y === botY)));
    let botRight = neighbors.forEach(neighbor => (botRight || (neighbor.x === rightX && neighbor.y === botY)));
    */

    // Check to see which ones exist, if exist then store
    let right, topRight, top, topLeft, left, botLeft, bot, botRight;
    for (let neighbor of neighbors) {
      if (neighbor.x === rightX && neighbor.y === this.y) right = neighbor;
      if (neighbor.x === rightX && neighbor.y === topY) topRight = neighbor;
      if (neighbor.x === this.x && neighbor.y === topY) top = neighbor;
      if (neighbor.x === leftX && neighbor.y === topY) topLeft = neighbor;
      if (neighbor.x === leftX && neighbor.y === this.y) left = neighbor;
      if (neighbor.x === leftX && neighbor.y === botY) botLeft = neighbor;
      if (neighbor.x === this.x && neighbor.y === botY) bot = neighbor;
      if (neighbor.x === rightX && neighbor.y === botY) botRight = neighbor;
    }

    let existance = [right, topRight, top, topLeft, left, botLeft, bot, botRight];
    existance.forEach(element => {
      if (element) orderedNeighbors.push(element);
    })

    return orderedNeighbors;
    //return neighbors;
  }
}
