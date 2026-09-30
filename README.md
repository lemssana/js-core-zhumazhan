# JavaScript Core Utilities & Store Implementation

**Author:** Akerke Zhumazhan  
**Repository:** `js-core-zhumazhan`  

---

## How to Run Tests

1. Install project dependencies:
   ```bash
   npm install

Test Results
Closures in My Code
In my project, closures are utilized within memoize and counter functions to encapsulate state securely. In counter(), the inner functions inc, dec, and value retain access to the count variable declared in their parent scope even after counter() has finished executing. In memoize(), the returned anonymous function retains access to a private cache Map instance. This prevents external mutation of the state while allowing persistent data access between function invocation cycles.

AI Tools Used
Gemini / ChatGPT: Assisted in designing test cases for edge cases, structuring Vitest assertions, and refining technical explanations regarding lexical scope and closures.
