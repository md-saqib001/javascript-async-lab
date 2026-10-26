
# Phase 01 — Node.js Fundamentals

## Lesson 1: JavaScript, Engines, and Runtime Environments

### 1. The three important concepts

**JavaScript** is a programming language. It defines syntax, variables, functions, objects, and standard built-in capabilities.

**JavaScript engine** executes JavaScript code. Google's V8 engine is used by Chrome and Node.js.

**Runtime environment** provides the environment in which JavaScript executes, including the engine and additional APIs.

Node.js is a JavaScript runtime that uses V8 and provides additional capabilities for running programs outside the browser.

### 2. Browser vs Node.js

| Feature | Browser | Node.js |
|---|---|---|
| JavaScript execution | Yes | Yes |
| `console` | Available | Available |
| `Promise` | Available | Available |
| `setTimeout` | Available | Available |
| `document` | Normally available | Normally unavailable |
| `process` | Normally unavailable | Available |

The important lesson is that the same JavaScript language can execute in different environments with different APIs.

### 3. Experiment: Inspect the environment

Code:

```javascript
console.log("process:", typeof process);
console.log("document:", typeof document);
console.log("setTimeout:", typeof setTimeout);
console.log("Promise:", typeof Promise);
```

Run in Node.js:

```bash
node 00-setup/environment.js
```

Expected output:

```text
process: object
document: undefined
setTimeout: function
Promise: function
```

In a normal browser page, the expected output is:

```text
process: undefined
document: object
setTimeout: function
Promise: function
```

### 4. What happens when we run a JavaScript file?

Command:

```bash
node 00-setup/hello.js
```

- `node` invokes the Node.js executable.
- `00-setup/hello.js` identifies the JavaScript file to execute.
- Node.js executes the program and prints its output.

### 5. Useful Node.js commands

Print the installed Node.js version:

```bash
node --version
```

Find the executable selected by the shell:

```bash
which node
```

Print the executable path used by the running Node.js process:

```bash
node -p "process.execPath"
```

Evaluate a JavaScript expression and print its result:

```bash
node -p "1+2"
```

Expected output:

```text
3
```

### 6. Key takeaways

- JavaScript is a language, not a browser.
- V8 is a JavaScript engine.
- Node.js is a runtime environment built around V8.
- Browsers and Node.js provide different APIs.
- `Promise` is a standard JavaScript built-in.
- `setTimeout` is provided by the surrounding environment.
- The `node` command runs JavaScript programs outside the browser.

### 7. Questions to revisit

1. What is the difference between a language and a runtime?
2. Why is `document` normally unavailable in Node.js?
3. Why is `Promise` available in both environments?
4. What does `node -p "1+2"` do?
