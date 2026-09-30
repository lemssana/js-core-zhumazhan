# JavaScript Core Utilities & Store Architecture

Study project for Web Development course, **Lab 4: Pure JavaScript, Closures, Classes and Unit Testing**.  
Author: **Akerke Zhumazhan** (`js-core-zhumazhan`)

---

## 1. How to Run Tests

```bash
# Install dependencies
npm install

# Run Vitest test suite
npm test
2. Functions & Classes Specifications
Core Functions (src/functions.js)
Function	Signature	Key Constructs	Validation & Edge Cases
unique	unique(arr)	Set, Array.from	Returns [] for empty or non-array inputs
groupBy	groupBy(arr, keyFn)	Array.prototype.reduce	Returns {} if input is invalid or missing key function
chunk	chunk(arr, size)	Array.prototype.slice	Returns [] if size is <= 0 or input is invalid
deepClone	deepClone(obj)	Recursion, Date, Array.map	Safely clones nested objects, arrays, dates, primitives
memoize	memoize(fn)	Closure over Map instance	Caches results by arguments; returns no-op for bad input
counter	counter(initial)	Lexical scope closure	Encapsulates count variable; exposes inc, dec, value
Classes (src/Store.js)
Class	Base / Inheritance	Features
Store	Base Class	Private field #items, static isValidItem, static createEmpty, add, remove, find, total, getItems
SortedStore	extends Store	Overrides getItems() using super.getItems() and sorts items by price ascending
3. Closures in My Code
In my project, closures are utilized within memoize and counter functions to encapsulate state securely. In counter(), the inner functions inc, dec, and value retain access to the count variable declared in their parent scope even after counter() has finished executing. In memoize(), the returned anonymous function retains access to a private cache Map instance. This prevents external mutation of the state while allowing persistent data access between function invocation cycles.
4. Test Results
5. AI Tools Used
Gemini / ChatGPT: Assisted in designing test cases for edge cases, structuring Vitest assertions, and refining technical explanations regarding lexical scope and closures.