const SQ_COUNT = 20;
//const SQ_LEN = 50;
let cells = [];
//let pathCells;

let button;
let find;
let searching = false;

function setup() {
  //createCanvas(2000, 1000);
  createCanvas(displayWidth, displayHeight);
  // Create cells.
  const SQ_LEN = floor(displayWidth/50);
  for (let x = 0; x < 20; x++) {
    for (let y = 0; y < 20; y++) {
      let posX = x*SQ_LEN;
      let posY = y*SQ_LEN;
      cells.push(new Cell(posX, posY));
    }
  }

  // Determine start, end || UNIT TEST
  cells[23].start = true;
  cells[46].end = true;


  // Create button
  button = createButton('Search');
  button.position(2*displayWidth/3, displayHeight/2);
  button.mousePressed(startSearch);

  // TEST PATH CLASS
  pathCells = cells.slice(0,2);
  pathCells.push(cells[20]);
  pathCells.push(cells[21]);
}



function draw() {
  background(0);
  fill(200);


  for (let cell of cells) {
    //cell.show(isInside(cell.getX(), cell.getY(), 50, 50));
    cell.show(isInside(cell.getX(), cell.getY(), floor(displayWidth/50), floor(displayWidth/50)));
  }

  // Draw the path
  if (find) {
    console.log('here');
    let path = new Path(find.path);
    path.show();

    if (path.cells.length !== 0) {
      searching = false;
    }
  }

}


let blocking = false;
let start = false;
let end = false;
function mousePressed() {
  for (let cell of cells) {
    //if (isInside(cell.getX(), cell.getY(), 50, 50)) {
    if (isInside(cell.getX(), cell.getY(), floor(displayWidth/50), floor(displayWidth/50))) {
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
      // if (isInside(cell.getX(), cell.getY(), 50, 50)) {
      if (isInside(cell.getX(), cell.getY(), floor(displayWidth/50), floor(displayWidth/50))) {
        if (start && !searching) {
          resetStart();
          cell.start = true;
          cell.unblock();
        }
        if (end && !searching) {
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

function resetCells() {
  cells.forEach( element => {element.reset();} );
}


function startSearch() {
  if (!searching) {
    searching = true;
    resetCells(cells);
    console.log(displayWidth);
    find = new Pathfinder(cells);
    let path = find.BFS();
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
