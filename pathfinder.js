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
    //  i.e. priority q, q, etc

  }

  backtrace(parent) {
    let path = [this.end];
    while (path[path.length-1] !== this.start) {
      path.push(parent.get(path[path.length-1]))
      console.log(path);
    }
    return path;
  }

  BFS() {
    let parent = new Map();
    let queue = new Queue();


    this.start.discovered = true;
    queue.enqueue(this.start);

    while(!queue.empty()) {
      let node = queue.dequeue();
      node.visited = true;
      redraw();
      if (node === this.end) {
        console.log('omo');
        return this.backtrace(parent);
      }

      for (let adjacent of node.getNeighbors(this.cells)) {
        if (!adjacent.discovered && !adjacent.blocks) {
          adjacent.discovered = true;
          redraw();
          //adjacent.blocks = true;
          parent.set(adjacent, node);
          queue.enqueue(adjacent);
        }
      }
    }
  }
}
