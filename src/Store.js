export class Store {
  #items = [];

  constructor(initialItems = []) {
    if (Array.isArray(initialItems)) {
      initialItems.forEach((item) => this.add(item));
    }
  }

  get count() {
    return this.#items.length;
  }

  static createEmpty() {
    return new Store();
  }

  add(item) {
    if (!item || typeof item !== 'object' || !item.name || typeof item.price !== 'number' || typeof item.qty !== 'number') {
      return false;
    }
    this.#items.push({ name: item.name, price: item.price, qty: item.qty });
    return true;
  }

  remove(name) {
    const index = this.#items.findIndex((item) => item.name === name);
    if (index !== -1) {
      this.#items.splice(index, 1);
      return true;
    }
    return false;
  }

  find(name) {
    return this.#items.find((item) => item.name === name) || null;
  }

  total() {
    return this.#items.reduce((sum, item) => sum + item.price * item.qty, 0);
  }

  getItems() {
    return [...this.#items];
  }
}

export class SortedStore extends Store {
  getItems() {
    const items = super.getItems();
    return items.sort((a, b) => a.price - b.price);
  }
}