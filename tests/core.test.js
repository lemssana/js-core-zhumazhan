import { describe, it, expect, vi } from 'vitest';
import { unique, groupBy, chunk, deepClone, memoize, counter } from '../src/functions.js';
import { Store, SortedStore } from '../src/Store.js';

describe('Core Functions', () => {
  it('unique: removes duplicate values from array', () => {
    expect(unique([1, 2, 2, 3, 1])).toEqual([1, 2, 3]);
    expect(unique([])).toEqual([]);
    expect(unique(null)).toEqual([]);
  });

  it('groupBy: groups objects by computed key', () => {
    const data = [{ category: 'fruit', name: 'apple' }, { category: 'veg', name: 'carrot' }];
    const res = groupBy(data, (item) => item.category);
    expect(res.fruit.length).toBe(1);
    expect(groupBy(null, null)).toEqual({});
  });

  it('chunk: splits array into sub-arrays of specified size', () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    expect(chunk([1, 2], 0)).toEqual([]);
    expect(chunk([], 3)).toEqual([]);
  });

  it('deepClone: performs deep copy of objects, arrays, and Date', () => {
    const date = new Date();
    const original = { a: 1, nested: { b: 2 }, d: date };
    const cloned = deepClone(original);
    expect(cloned).toEqual(original);
    expect(cloned.nested).not.toBe(original.nested);
    expect(cloned.d).not.toBe(original.d);
  });

  it('memoize: caches results via closure', () => {
    const fn = vi.fn((x) => x * 2);
    const memo = memoize(fn);
    expect(memo(5)).toBe(10);
    expect(memo(5)).toBe(10);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('counter: isolates state using lexical scope closure', () => {
    const c = counter(10);
    expect(c.value()).toBe(10);
    expect(c.inc()).toBe(11);
    expect(c.dec()).toBe(10);
  });
});

describe('Store & SortedStore Classes', () => {
  it('Store: manages items and calculates total price correctly', () => {
    const store = new Store();
    store.add({ name: 'Book', price: 10, qty: 2 });
    store.add({ name: 'Pen', price: 2, qty: 5 });
    expect(store.total()).toBe(30);
    expect(store.count).toBe(2);
  });

  it('Store: merges item quantities on duplicate add', () => {
    const store = new Store();
    store.add({ name: 'Notebook', price: 15, qty: 1 });
    store.add({ name: 'Notebook', price: 15, qty: 3 });
    expect(store.find('Notebook').qty).toBe(4);
  });

  it('Store: removes and finds items accurately', () => {
    const store = new Store();
    store.add({ name: 'Laptop', price: 1000, qty: 1 });
    expect(store.find('Laptop')).toEqual({ name: 'Laptop', price: 1000, qty: 1 });
    expect(store.remove('Laptop')).toBe(true);
    expect(store.find('Laptop')).toBeNull();
  });

  it('Store: static createEmpty returns empty store', () => {
    const store = Store.createEmpty();
    expect(store.count).toBe(0);
  });

  it('SortedStore: overrides getItems and sorts by price via super', () => {
    const store = new SortedStore();
    store.add({ name: 'Expensive', price: 100, qty: 1 });
    store.add({ name: 'Cheap', price: 10, qty: 1 });
    const items = store.getItems();
    expect(items[0].price).toBe(10);
    expect(items[1].price).toBe(100);
  });

  it('Edge Case: Store rejects invalid item schemas', () => {
    const store = new Store();
    expect(store.add(null)).toBe(false);
    expect(store.add({ name: 'Invalid' })).toBe(false);
  });
});