class Pathfinder {
  constructor(cells) {
    // Find and store the start/end cells
    this.start = null;
    this.end = null;
    this.cells = cells;
    for (let cell of cells) {
      if (cell.start) {
        this.start = cell;
      }
      if (cell.end) {
        this.end = cell;
      }
    }

    if (this.start === null || this.end === null) {
      throw "nonexistant start/end";
    }


    // add necessary data structures
    //  i.e. priority q, etc
  }

  function dijkstra() {

  }
}
