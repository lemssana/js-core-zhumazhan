import { describe, it, expect, vi } from 'vitest';
import { unique, groupBy, chunk, deepClone, memoize, counter } from '../src/functions.js';
import { Store, SortedStore } from '../src/Store.js';

describe('Functions', () => {
  it('unique should remove duplicate values', () => {
    expect(unique([1, 2, 2, 3, 1])).toEqual([1, 2, 3]);
    expect(unique([])).toEqual([]);
  });

  it('groupBy should group items by computed key', () => {
    const data = [{ category: 'fruit', name: 'apple' }, { category: 'fruit', name: 'banana' }, { category: 'veg', name: 'carrot' }];
    const result = groupBy(data, (item) => item.category);
    expect(result.fruit.length).toBe(2);
    expect(result.veg.length).toBe(1);
  });

  it('chunk should split array into chunks of specified size', () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    expect(chunk([1, 2], 0)).toEqual([]);
  });

  it('deepClone should perform deep copy of objects, arrays, and dates', () => {
    const date = new Date();
    const original = { a: 1, b: { c: 2 }, d: date };
    const cloned = deepClone(original);
    expect(cloned).toEqual(original);
    expect(cloned.b).not.toBe(original.b);
    expect(cloned.d).not.toBe(original.d);
  });

  it('memoize should cache function execution results', () => {
    const fn = vi.fn((x) => x * 2);
    const memoized = memoize(fn);
    expect(memoized(5)).toBe(10);
    expect(memoized(5)).toBe(10);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('counter should manage encapsulated state using closures', () => {
    const c = counter(10);
    expect(c.value()).toBe(10);
    expect(c.inc()).toBe(11);
    expect(c.dec()).toBe(10);
  });
});

describe('Store Classes', () => {
  it('Store should manage items and calculate total correct price', () => {
    const store = new Store();
    store.add({ name: 'Book', price: 10, qty: 2 });
    store.add({ name: 'Pen', price: 2, qty: 5 });
    expect(store.total()).toBe(30);
    expect(store.count).toBe(2);
  });

  it('Store should handle remove and search operations', () => {
    const store = new Store();
    store.add({ name: 'Laptop', price: 1000, qty: 1 });
    expect(store.find('Laptop')).toEqual({ name: 'Laptop', price: 1000, qty: 1 });
    expect(store.remove('Laptop')).toBe(true);
    expect(store.find('Laptop')).toBeNull();
  });

  it('Store static method createEmpty should instantiate empty store', () => {
    const store = Store.createEmpty();
    expect(store.count).toBe(0);
  });

  it('SortedStore should override getItems and return sorted array via super', () => {
    const store = new SortedStore();
    store.add({ name: 'A', price: 50, qty: 1 });
    store.add({ name: 'B', price: 10, qty: 1 });
    const items = store.getItems();
    expect(items[0].price).toBe(10);
    expect(items[1].price).toBe(50);
  });

  it('Edge case: unique should handle invalid input gracefully', () => {
    expect(unique(null)).toEqual([]);
  });

  it('Edge case: chunk should handle empty array', () => {
    expect(chunk([], 3)).toEqual([]);
  });

  it('Edge case: Store should reject invalid item additions', () => {
    const store = new Store();
    expect(store.add(null)).toBe(false);
    expect(store.add({ name: 'Test' })).toBe(false);
  });

  it('Edge case: deepClone should handle primitive types', () => {
    expect(deepClone(42)).toBe(42);
    expect(deepClone('hello')).toBe('hello');
  });
});