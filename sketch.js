const SQ_COUNT = 20;
const SQ_LEN = 50;
let cells = [];

function setup() {
  createCanvas(1000, 1000);

  // Create cells
  for (let x = 0; x < 20; x++) {
    for (let y = 0; y < 20; y++) {
      let posX = x*SQ_LEN;
      let posY = y*SQ_LEN;
      cells.push(new Cell(posX, posY));
    }
  }

  // Determine start, end || UNIT TEST
  cells[23].start = true;
  cells[76].end = true;
}

function draw() {
  background(0);
  fill(200);

  for (let cell of cells) {
    cell.show(isInside(cell.getX(), cell.getY(), 50, 50));
  }
}


let blocking = false;
let start = false;
let end = false;
function mousePressed() {
  for (let cell of cells) {
    if (isInside(cell.getX(), cell.getY(), 50, 50)) {

      if (cell.start) {
        start = true;
      }
      else if (cell.end) {
        end = true;
      }
      else if ( cell.blocks ) {
        cell.unblock();
        blocking = false;
      }
      else {
        cell.block();
        blocking = true;
      }

      if (!start && !end) {
        cell.pressed = true;
      }

    }
  }
}

function mouseDragged() {
  for (let cell of cells) {
    if (!cell.pressed) {
      if (isInside(cell.getX(), cell.getY(), 50, 50)) {
        if (start) {
          resetStart();
          cell.start = true;
          cell.unblock();
        }
        if (end) {
          resetEnd();
          cell.end = true;
          cell.unblock();
        }
        if (cell.blocks && !blocking) {
          cell.unblock();
        }
        if (!cell.blocks && blocking) {
          cell.block();
        }

        if (!start && !end) {
          cell.pressed = true;
        }

      }
    }
  }
  return false;
}

function mouseReleased() {
  for (let cell of cells) {
    cell.pressed = false;
  }
  start = false;
  end = false;
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

function resetStart() {
  for (let cell of cells) {
    cell.start = false;
  }
}

function resetEnd() {
  for (let cell of cells) {
    cell.end = false;
  }
}
