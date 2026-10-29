# Phase 04 — JavaScript Modules

## Goal
Understand how JavaScript splits code across multiple files, the difference between CommonJS and ES Modules, and how Node.js caches modules in memory to share state.

---

## Lesson 1: Why Modules Exist & The CommonJS Standard

### 1. The Spaghetti Code Problem
If you write 10,000 lines of code inside a single `index.js` file, variables will collide and the codebase becomes unmaintainable. 
A **module** is simply a file that keeps its variables private by default and explicitly shares (exports) only the pieces of code it wants other files to use.

### 2. Experiment: CommonJS (CJS)
Node.js was created in 2009 and uses **CommonJS** by default.

File: `04-javascript-modules/01-commonjs/math.js`
```javascript
const secretPi = 3.14159; // Completely private!

module.exports = {
  add: (a, b) => a + b,
  multiply: (a, b) => a * b
};
```
File: `04-javascript-modules/01-commonjs/app.js`
```javascript
const math = require("./math.js");
console.log("5 + 3 =", math.add(5, 3));
console.log("secretPi:", math.secretPi); // undefined
```

### 3. How the Code Actually Works
1. When `app.js` runs `require("./math.js")`, Node goes to `math.js` and executes it from top to bottom.
2. It sees the `secretPi` variable, but notices we only attached `add` and `multiply` to the special `module.exports` object.
3. `require` returns that `module.exports` object and assigns it to the `math` variable in `app.js`.
4. When we try to print `math.secretPi`, it returns `undefined` because `secretPi` was never attached to the exported object. It is permanently locked inside the `math.js` file's private scope.

---

## Lesson 2: ES Modules (ESM)

### 1. The Modern Standard
In 2015, JavaScript officially adopted **ES Modules**. This is the standard used in modern browsers and React. To tell Node.js to use this new parser instead of CommonJS, we use the `.mjs` (Module JavaScript) file extension.

### 2. Experiment: ES Modules
File: `04-javascript-modules/02-esm/math.mjs`
```javascript
export function add(a, b) { return a + b; }
export function multiply(a, b) { return a * b; }
```
File: `04-javascript-modules/02-esm/app.mjs`
```javascript
import { add, multiply } from "./math.mjs";
console.log("5 + 3 =", add(5, 3));
```

### 3. How the Code Actually Works
1. Instead of building a single `module.exports` object at the bottom, we use the `export` keyword directly in front of the functions we want to share. This creates **Named Exports**.
2. In `app.mjs`, we use `{ add, multiply }` (Object Destructuring) to pluck exactly the functions we want out of the file.
3. **Important Gotcha:** Notice the import string is exactly `"./math.mjs"`. Unlike CommonJS, which can automatically guess file extensions, ES Modules in Node.js require you to type the exact file extension.

---

## Lesson 3: Module Caching (The Singleton Pattern)

### 1. The Multiple Connection Danger
If `app.js` and `worker.js` both require the exact same file, does Node.js execute that file twice? 

### 2. Experiment: Prove Caching
File: `04-javascript-modules/03-caching/counter.js`
```javascript
console.log("🚀 Module is booting up! This should only print ONCE.");
let visits = 0;
module.exports = { addVisit: () => visits++, getVisits: () => visits };
```
File: `04-javascript-modules/03-caching/worker.js`
```javascript
const counter = require("./counter.js");
counter.addVisit();
```
File: `04-javascript-modules/03-caching/app.js`
```javascript
const counter = require("./counter.js");
counter.addVisit(); 

require("./worker.js"); 

console.log("App visits count:", counter.getVisits());
```

### 3. Execution Flow: How `visits` is Modified Twice
Here is the exact step-by-step timeline of how Node executes this code:
1. `app.js` calls `require("./counter.js")`.
2. Node sees `counter.js` has never been run. It executes it, prints the `🚀 Booting up` log, initializes `let visits = 0`, and returns the exported object. **CRUCIAL: Node then saves (caches) this object in memory.**
3. `app.js` calls `counter.addVisit()`. The private `visits` variable inside `counter.js` goes from 0 to 1.
4. `app.js` calls `require("./worker.js")`, so Node pauses `app.js` and runs `worker.js`.
5. `worker.js` calls `require("./counter.js")`. 
6. **The Magic:** Node sees `counter.js` is already in the cache! It skips executing the file entirely (which is why the `🚀 Booting up` log does NOT print a second time). Instead, it hands `worker.js` the exact same object from memory.
7. `worker.js` calls `counter.addVisit()`. Because it's pointing to the exact same memory reference, the shared `visits` variable increments from 1 to 2.
8. Back in `app.js`, it prints the total. Because both files modified the exact same instance, it correctly prints `2`. 

**Takeaway:** Node modules act as **Singletons**. They share state across your entire application, making them perfect for sharing a single database connection across 50 different files.