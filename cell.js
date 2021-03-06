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
    this.visited = false;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  getCenterX() {
    return this.x + floor(displayWidth/50)/2;//25;
  }

  getCenterY() {
    return this.y + floor(displayWidth/50)/2;//25;
  }

  reset() {
    this.discovered = false;
    this.visited = false;
  }

  show(isInside=false) {
    if (isInside && !this.start  && !this.end) {
      fill(220,220,220);
    }
    else if (this.start) {
      //fill(124,252,0);
      fill(214,242,210);
    }
    else if (this.end) {
      //fill(255, 0 , 0);
      fill(242,210,230);
    }
    else if (this.visited) {
      fill(140,180,210);
      // dark blue?
    }
    else if (this.discovered) {
      fill(162,214,236);
      // some lighter variation of visited
    }
    else if (this.blocks){
      fill(209,164,251);
    }
    else {
      fill(255);
    }

    //rect(this.x, this.y, 50, 50);
    rect(this.x, this.y, floor(displayWidth/50), floor(displayWidth/50));
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
    let distance = floor(Math.sqrt((this.x-cell.x)*(this.x-cell.x)+(this.y-cell.y)*(this.y-cell.y)))//dist(this.x, this.y, cell.x, cell.y);

    // Calculate coordinates of diagonal cells
    let rightX = this.x + displayWidth/50;// 50;
    let topY = this.y - displayWidth/50;//50;
    let leftX = this.x - displayWidth/50;//50;
    let botY = this.y + displayWidth/50;//50;

    // Check if cell is a diagonal
    let topRight = (cell.x === rightX && cell.y === topY);
    let topLeft = (cell.x === leftX && cell.y === topY);
    let botRight = (cell.x === rightX && cell.y === botY);
    let botLeft = (cell.x === leftX && cell.y === botY);

    //return (distance === 50 || topRight || topLeft || botRight || botLeft);
    return (distance ===  floor(displayWidth/50) || topRight || topLeft || botRight || botLeft);
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
    let rightX = this.x +  floor(displayWidth/50);//50;
    let topY = this.y -  floor(displayWidth/50);//50;
    let leftX = this.x -  floor(displayWidth/50);//50;
    let botY = this.y +  floor(displayWidth/50);//50;


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

    //let existance = [right, topRight, top, topLeft, left, botLeft, bot, botRight];
    let existance = [right,  top,  left,  bot];

    existance.forEach(element => {
      if (element) orderedNeighbors.push(element);
    })

    return orderedNeighbors;
    //return neighbors;
  }
}
