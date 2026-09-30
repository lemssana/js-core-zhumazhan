export function unique(arr) {
  if (!Array.isArray(arr)) return [];
  return Array.from(new Set(arr));
}

export function groupBy(arr, keyFn) {
  if (!Array.isArray(arr) || typeof keyFn !== 'function') return {};
  return arr.reduce((acc, item) => {
    const key = keyFn(item);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {});
}

export function chunk(arr, size) {
  if (!Array.isArray(arr) || size <= 0) return [];
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

export function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item));
  }

  const copy = {};
  for (const key of Object.keys(obj)) {
    copy[key] = deepClone(obj[key]);
  }
  return copy;
}

export function memoize(fn) {
  if (typeof fn !== 'function') return () => {};
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

export function counter(initialValue = 0) {
  let count = typeof initialValue === 'number' ? initialValue : 0;
  return {
    inc: () => ++count,
    dec: () => --count,
    value: () => count
  };
}