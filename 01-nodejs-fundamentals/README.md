# Phase 01 — Node.js Fundamentals

## Lesson 1: JavaScript, Engines, and Runtime Environments

### 1. The Three Important Concepts

**JavaScript** is a programming language. It defines syntax, variables, functions, objects, and standard built-in capabilities.

**JavaScript engine** executes JavaScript code. Google's V8 engine is used by Chrome and Node.js.

**Runtime environment** provides the environment in which JavaScript executes, including the engine and additional APIs.

Node.js is a JavaScript runtime that uses V8 and provides additional capabilities for running programs outside the browser.

### 2. Browser vs. Node.js

| Feature | Browser | Node.js |
|---|---|---|
| JavaScript execution | Yes | Yes |
| `console` | Available | Available |
| `Promise` | Available | Available |
| `setTimeout` | Available | Available |
| `document` | Normally available | Normally unavailable |
| `process` | Normally unavailable | Available |

The important lesson is that the same JavaScript language can execute in different environments with different APIs.

### 3. Experiment: Inspect the Environment

File: `00-setup/environment.js`

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

**Note:** These results describe typical environments. Browser APIs can vary by context, and some browser tools can expose additional globals.

### 4. What Happens When We Run a JavaScript File?

Command:

```bash
node 00-setup/hello.js
```

- `node` invokes the Node.js executable.
- `00-setup/hello.js` identifies the JavaScript file to execute.
- Node.js executes the program and prints its output.

### 5. Useful Node.js Commands

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

### 6. Key Takeaways

- JavaScript is a language, not a browser.
- V8 is a JavaScript engine.
- Node.js is a runtime environment built around V8.
- Browsers and Node.js provide different APIs.
- `Promise` is a standard JavaScript built-in.
- `setTimeout` is provided by the surrounding environment.
- The `node` command runs JavaScript programs outside the browser.

### 7. Questions to Revisit

1. What is the difference between a language and a runtime?
2. Why is `document` normally unavailable in Node.js?
3. Why is `Promise` available in both environments?
4. What does `node -p "1+2"` do?

---

## Lesson 2: Node.js and the V8 Engine

In the previous lesson, we learned that Node.js uses V8 and provides APIs beyond the JavaScript language itself.

Now let's examine that relationship more closely and verify it using our own Node.js installation.

### 1. What Is V8?

V8 is a JavaScript engine. It executes JavaScript code by interpreting and compiling it.

V8 is used in multiple environments, including Google Chrome and Node.js.

### 2. What Is Node.js?

Node.js is a JavaScript runtime environment. It uses V8 to execute JavaScript and provides additional capabilities that allow JavaScript programs to run outside a web browser.

For example, Node.js provides APIs for working with files and accessing information about the running process.

### 3. Key Differences

| V8 | Node.js |
|---|---|
| JavaScript engine | JavaScript runtime environment |
| Executes JavaScript | Provides an environment for executing JavaScript |
| Does not, by itself, provide the complete Node.js API | Provides APIs such as `process` and file-system access |
| Can be embedded in different applications | Uses V8 as its JavaScript engine |

**Mental model:** V8 is responsible for executing JavaScript; Node.js combines V8 with additional runtime facilities.

### 4. Experiment: Inspect the Versions

Create the file `00-setup/engine.js`:

```javascript
console.log("Node.js version:", process.version);
console.log("V8 version:", process.versions.v8);
```

Run:

```bash
node 00-setup/engine.js
```

Observed output on my setup:

```text
Node.js version: v24.22.1
V8 version: 13.6.233.17-node.58
```

The exact versions depend on the installed Node.js release.

### 5. Understanding the Output

- `process.version` reports the installed Node.js version.
- `process.versions.v8` reports the V8 engine version used by Node.js.
- The two values differ because Node.js and V8 are separate components.
- The `process` object is provided by Node.js; it is not a standard JavaScript language feature available in every runtime.

This experiment confirms that our Node.js installation contains a particular version of V8. It also shows that we can inspect information about the runtime from within a JavaScript program.

### 6. What I Learned

Node.js is more than a JavaScript engine. It uses V8 to execute JavaScript and provides additional runtime APIs.

The same JavaScript language can run in different environments, but the APIs available to a program depend on its environment.

### 7. Questions to Revisit

1. What is the difference between V8 and Node.js?
2. Why can V8 be used by both Chrome and Node.js?
3. What information does `process.version` provide?
4. What information does `process.versions.v8` provide?
5. Why is `process` not available by default in a normal browser page?