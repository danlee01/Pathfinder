const SQ_COUNT = 20;
const SQ_LEN = 50;
let cells = [];

function setup() {
  createCanvas(1000, 1000);

  for (let x = 0; x < 20; x++) {
    for (let y = 0; y < 20; y++) {
      let posX = x*SQ_LEN;
      let posY = y*SQ_LEN;
      cells.push(new Cell(posX, posY));
    }
  }
}

function draw() {
  background(0);
  fill(200);

  for (let cell of cells) {
    cell.show(isInside(cell.getX(), cell.getY(), 50, 50));
  }
}

function mouseDragged() {
  //console.log(`x: ${mouseX}, y: ${mouseY}`);

  for (let cell of cells) {
    if (isInside(cell.getX(), cell.getY(), 50, 50)) {
      if ( cell.blocks ) {
        cell.unblock();
      }
      else {
        cell.block();
      }
    }
  }
  return false;
}

function isInside(x, y, w, h) {
  if (mouseX > x &&
      mouseX < x + w &&
      mouseY > y &&
      mouseY < y + h) {
        return true;
      }
  else {
    return false;
  }
}
