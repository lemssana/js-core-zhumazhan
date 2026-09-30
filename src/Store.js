export class Store {
  #items = [];

  constructor(initialItems = []) {
    if (Array.isArray(initialItems)) {
      initialItems.forEach((item) => this.add(item));
    }
  }

  static isValidItem(item) {
    return (
      item !== null &&
      typeof item === 'object' &&
      typeof item.name === 'string' &&
      typeof item.price === 'number' &&
      typeof item.qty === 'number'
    );
  }

  static createEmpty() {
    return new Store();
  }

  get count() {
    return this.#items.length;
  }

  add(item) {
    if (!Store.isValidItem(item)) {
      return false;
    }
    const existing = this.#items.find((i) => i.name === item.name);
    if (existing) {
      existing.qty += item.qty;
    } else {
      this.#items.push({ name: item.name, price: item.price, qty: item.qty });
    }
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
    const item = this.#items.find((i) => i.name === name);
    return item ? { ...item } : null;
  }

  total() {
    return this.#items.reduce((sum, item) => sum + item.price * item.qty, 0);
  }

  getItems() {
    return this.#items.map((item) => ({ ...item }));
  }
}

export class SortedStore extends Store {
  getItems() {
    const items = super.getItems();
    return items.sort((a, b) => a.price - b.price);
  }
}