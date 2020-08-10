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

    this.path = [];
  }

  backtrace(parent) {
    let path = [this.end];
    while (path[path.length-1] !== this.start) {
      path.push(parent.get(path[path.length-1]))
    }
    return path;
  }

  async BFS() {
    let parent = new Map();
    let queue = new Queue();


    this.start.discovered = true;
    queue.enqueue(this.start);


    while(!queue.empty()) {
      let node = queue.dequeue();
      node.visited = true;

      // Wait for 100 ms between each node
      await new Promise(r => setTimeout(r, 100));

      if (node === this.end) {
        this.path = this.backtrace(parent);
        return;
      }

      for (let adjacent of node.getNeighbors(this.cells)) {
        if (!adjacent.discovered && !adjacent.blocks) {
          adjacent.discovered = true;
          //adjacent.blocks = true;
          parent.set(adjacent, node);
          queue.enqueue(adjacent);
        }
      }
    }
  }
}
