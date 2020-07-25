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

  function BFS() {
    parent = {}
    queue = new Queue();

    queue.enqueue(this.start);

    while(!queue.empty()) {
      let node = queue.dequeue();
      if (node == this.end) {
        // process the path
      }

      for (let adjacent of node.getNeighbors()) {
        if (!queue.contains(node)) {
          parent[adjacent] = node;
          queue.enqueue(adjacent);
        }
      }
    }
  }
}
