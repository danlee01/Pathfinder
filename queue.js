class Queue {
  constructor() {
    this.items = [];
  }

  dequeue() {
    if (this.items.length !== 0) {
      return this.items.pop();
    }

    return null;
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

  contains(element) {
    for (let item of items) {
      if (item === element) {
        return true;
      }
    }
    return false;
  }
}
