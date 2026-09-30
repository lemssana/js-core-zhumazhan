JavaScript Core Utilities & Store Architecture

Course: Web Development (IT1-2305 / IT1-2301)

Assignment: Lab 4 — Pure JavaScript Functions, Closures, ES6 Classes & Unit Testing with Vitest

Student: Akerke Zhumazhan

Repository: js-core-zhumazhan

1. Project Overview

This repository contains an isolated JavaScript Core module implemented for Lab 4. The project strictly focuses on core language constructs without reliance on DOM manipulation or browser-specific APIs. Key deliverables include:

6 Helper Functions: Covering array transformation, grouping, chunking, deep object mutation, function memoization, and state encapsulation.

ES6 Object-Oriented Store: A baseline Store class with private instance fields (#items), validation logic, calculations, and a derived SortedStore class extending base capabilities.

Automated Unit Testing: Comprehensive test coverage using Vitest, verifying standard behaviors, strict type safety, edge cases, and state isolation.

2. Project Architecture & Directory Structure

js-core-zhumazhan/
├── src/
│   ├── functions.js    # Implementation of core utility functions & closures
│   └── Store.js        # Baseline Store and SortedStore ES6 class implementations
├── tests/
│   └── core.test.js    # Full Vitest suite covering edge cases and class mechanics
├── package.json        # Dependencies (Vitest) and ES module configuration ("type": "module")
├── README.md           # Comprehensive project documentation
└── screenshot.png      # Screenshot verification of passing unit test suite


3. Function & Class Specifications

Core Functions (src/functions.js)

Function

Signature

Algorithmic Approach & Key Constructs

Edge Cases & Validation

unique

unique(arr)

Utilizes standard Set data structure and Array.from for $O(N)$ duplicate removal while preserving element order.

Returns empty array [] on null, undefined, or non-array inputs.

groupBy

groupBy(arr, keyFn)

Accumulates elements into a key-indexed object using Array.prototype.reduce.

Gracefully handles non-function keys or empty array inputs by returning {}.

chunk

chunk(arr, size)

Slices input arrays into sub-arrays of length size using a standard for loop iteration.

Returns [] if input is invalid, array is empty, or size <= 0.

deepClone

deepClone(obj)

Recursively duplicates plain objects, arrays, and preserves Date objects (new Date(obj.getTime())).

Preserves primitive values, null, and isolates nested memory references.

memoize

memoize(fn)

Higher-Order Function wrapping fn with a private Map cache instance via lexical closure.

Caches duplicate arguments; returns fallback function if fn is invalid.

counter

counter(initialValue)

Closure factory exposing an interface { inc, dec, value } encapsulating a count integer.

Fallbacks to 0 if initialValue is non-numeric; prevents external state tampering.

Classes (src/Store.js)

Store

Private Fields (#items): Inventory items are stored in a private #items array to prevent direct external mutation (store.#items throws a Syntax Error).

Item Schema: Items are represented as { name: string, price: number, qty: number }.

Quantity Merging: Re-adding an existing item updates its qty property instead of creating duplicate entries.

Static Utilities:

Store.isValidItem(item): Validates object shape and data types before insertion.

Store.createEmpty(): Factory method instantiating a clean Store.

Defensive Copies: Methods like find() and getItems() return cloned objects/arrays to guarantee immutability.

SortedStore (extends Store)

Inherits core state management and methods from Store.

Overrides getItems() using super.getItems() and sorts inventory items in ascending order by price.

4. Deep Dive: Closures in My Code

A closure is a fundamental JavaScript mechanism where an inner function retains access to its lexical scope (variables defined in its parent function) even after the outer function has finished executing.

1. counter(initialValue)

export function counter(initialValue = 0) {
  let count = typeof initialValue === 'number' ? initialValue : 0;
  return {
    inc: () => ++count,
    dec: () => --count,
    value: () => count
  };
}


In counter(), the variable count is instantiated within the outer scope. The returned object contains three arrow functions (inc, dec, value). Each function forms a closure over count. External access to count directly (counterInstance.count) returns undefined, ensuring complete encapsulation while allowing controlled modification exclusively through the exposed API.

2. memoize(fn)

export function memoize(fn) {
  if (typeof fn !== 'function') return () => {};
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}


In memoize(), the outer function creates an isolated cache = new Map() instance. The returned anonymous function retains a closure over both cache and fn. When called repeatedly with identical arguments, it resolves cached values instantly without re-executing fn, optimizing execution time for costly operations.

5. How to Run Tests

Prerequisites

Ensure Node.js LTS is installed:

node -v  # Expected v18+ or v20+
npm -v   # Expected v9+ or v10+


Installation & Execution

Install development dependencies:

npm install


Execute the Vitest test suite:

npm test


6. Test Suite Results

All 12 unit tests covering functional logic, edge cases, class inheritance, and private scope encapsulation pass cleanly:

 ✓ tests/core.test.js (12 tests) 3ms
   ✓ Core Functions (6)
     ✓ unique: removes duplicate values from array
     ✓ groupBy: groups objects by computed key
     ✓ chunk: splits array into sub-arrays of specified size
     ✓ deepClone: performs deep copy of objects, arrays, and Date
     ✓ memoize: caches results via closure
     ✓ counter: isolates state using lexical scope closure
   ✓ Store & SortedStore Classes (6)
     ✓ Store: manages items and calculates total price correctly
     ✓ Store: merges item quantities on duplicate add
     ✓ Store: removes and finds items accurately
     ✓ Store: static createEmpty returns empty store
     ✓ SortedStore: overrides getItems and sorts by price via super
     ✓ Edge Case: Store rejects invalid item schemas

 Test Files  1 passed (1)
      Tests  12 passed (12)
   Start at  13:01:19
   Duration  72ms


7. AI Tools Collaboration Statement

AI Model: Gemini was utilized to consult on syllabus specifications, structure Vitest assertions for edge cases, and draft comprehensive documentation tables.

Manual Verification: All implementations, algorithmic structures, ES6 class mechanics, and unit test suites were manually written, executed, verified, and debugged within the local VS Code environment.