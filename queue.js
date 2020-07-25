class Queue {
  constructor() {
    this.items = [];
  }

  dequeue() {
    if (this.items.length !== 0) {
      return this.items.pop();
    }
  }

  enqueue(item) {
    this.items.unshift(item);
  }

  length() {
    return this.items.length;
  }

  empty() {
    return (this.items.length === 0) ? true : false;
  }
}
