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
      //node.blocks = true;
      if (node === this.end) {
        // process the path
        // TEST
        console.log('omo');
        //return parent;
        return this.backtrace(parent);
      }

      // FIX: the getNeighbors function need to return cells in a certain order
      for (let adjacent of node.getNeighbors(this.cells)) {
        if (!adjacent.discovered) {
          adjacent.discovered = true;
          //adjacent.blocks = true;
          parent.set(adjacent, node);
          queue.enqueue(adjacent);
        }
      }
    }
  }
}
