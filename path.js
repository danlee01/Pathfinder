class Path {
  constructor(path) {
    this.cells = path;
  }

  show() {
    // This is assuming that the order of cells is the order of the path
    if (this.cells.length < 2) {
      return;
    }

    for (let i = 0; i < this.cells.length - 1; i++) {
      line(
        this.cells[i].getCenterX(),
        this.cells[i].getCenterY(),
        this.cells[i+1].getCenterX(),
        this.cells[i+1].getCenterY()
      )
    }
  }

  // Add a append function to path class??
}
