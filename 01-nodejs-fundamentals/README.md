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

File: `01-nodejs-fundamentals/environment.js`

```javascript
console.log("Environment:", typeof process === "object" ? "Node.js" : "Browser or another environment");
console.log("process:", typeof process);
console.log("document:", typeof document);
console.log("console:", typeof console);
console.log("setTimeout:", typeof setTimeout);
console.log("Promise:", typeof Promise);
```

Run in Node.js:

```bash
node 01-nodejs-fundamentals/environment.js
```

Expected output:

```text
Environment: Node.js
process: object
document: undefined
console: object
setTimeout: function
Promise: function
```

In a normal browser page, the expected output is:

```text
Environment: Browser or another environment
process: undefined
document: object
console: object
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

Create the file `01-nodejs-fundamentals/engine.js`:

```javascript
console.log("Node.js version:", process.version);
console.log("V8 version:", process.versions.v8);
```

Run:

```bash
node 01-nodejs-fundamentals/engine.js
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

---

## Lesson 3: The Global Object and `globalThis`

In Lessons 1 and 2, we used `console`, `process`, `setTimeout`, and `Promise` without importing or declaring them.

Where do these globally available values live, and how do we access the global object across different environments?

### 1. What Is the Global Object?

Every JavaScript runtime provides a top-level object called the **global object**. Built-in language objects (like `Promise`) and environment APIs (like `console`, `setTimeout`, or `process`) are attached as properties on this global object.

### 2. Why Do We Need `globalThis`?

Historically, different JavaScript environments gave the global object different names:

| Environment | Traditional Global Object Name | `globalThis` Available? |
|---|---|---|
| Browser (Main Thread) | `window` | Yes (`globalThis === window`) |
| Web Workers | `self` | Yes (`globalThis === self`) |
| Node.js | `global` | Yes (`globalThis === global`) |

Because of these different names, code written with `window.setTimeout` would fail in Node.js with `ReferenceError: window is not defined`.

JavaScript introduced **`globalThis`** as the standard, universal name for the global object across all environments.

### 3. Experiment: Inspect `globalThis`

Create the file `01-nodejs-fundamentals/global-this.js`:

```javascript
console.log("globalThis:", typeof globalThis);
console.log("global:", typeof global);
console.log("window:", typeof window);
console.log("globalThis === global:", globalThis === global);
console.log("globalThis.process === process:", globalThis.process === process);
console.log("globalThis.console === console:", globalThis.console === console);
console.log("globalThis.Promise === Promise:", globalThis.Promise === Promise);
```

Run:

```bash
node 01-nodejs-fundamentals/global-this.js
```

Expected output:

```text
globalThis: object
global: object
window: undefined
globalThis === global: true
globalThis.process === process: true
globalThis.console === console: true
globalThis.Promise === Promise: true
```

### 4. Understanding the Output

- `globalThis` and `global` are both objects in Node.js, and `globalThis === global` evaluates to `true`.
- `window` is `undefined` because `window` is the browser's global object, not Node.js's.
- `process`, `console`, and `Promise` are accessible directly as globals because they are properties on `globalThis` (`globalThis.process === process`).

### 5. What I Learned

`globalThis` is the standard way to refer to the global object in any modern JavaScript environment.

In Node.js, `globalThis` points to the same object as `global`, while in a browser it points to `window`.

### 6. Questions to Revisit

1. Why was `globalThis` added to JavaScript?
2. Why is `window` `undefined` in Node.js?
3. What does `globalThis === global` return in Node.js?
4. Why does `globalThis.Promise === Promise` evaluate to `true`?

---

## Lesson 4: Inspecting `process` in Node.js

We have already used `process.version` and `process.versions.v8`. Now let's examine what else the `process` object provides when our program runs.

### 1. What Is `process`?

When we run `node file.js`, the operating system starts a running program called a **process**.

Node.js provides the global `process` object so our JavaScript code can inspect and interact with that currently running operating system process.

### 2. Useful Properties and Methods on `process`

| Property / Method | What It Represents |
|---|---|
| `process.version` | The installed Node.js version string |
| `process.versions` | An object listing versions of Node.js, V8, libuv, and other internal components |
| `process.platform` | The operating system platform (e.g., `'linux'`, `'darwin'`, `'win32'`) |
| `process.pid` | The Process ID assigned by the operating system |
| `process.cwd()` | A method returning the current working directory from which `node` was invoked |
| `process.execPath` | The absolute path to the `node` executable running the program |
| `process.argv` | An array containing the command-line arguments passed when starting the process |

### 3. Experiment: Inspect `console` and `process` Together

Create the file `01-nodejs-fundamentals/console-process.js`:

```javascript
console.log("Node.js version:", process.version);
console.log("Platform:", process.platform);
console.log("Process ID (PID):", process.pid);
console.log("Current working directory:", process.cwd());
console.log("Node executable path:", process.execPath);
console.log("Command-line arguments (argv):", process.argv);
```

Run:

```bash
node 01-nodejs-fundamentals/console-process.js
```

Example output:

```text
Node.js version: v24.22.1
Platform: linux
Process ID (PID): 48291
Current working directory: /home/user/javascript-async-lab
Node executable path: /home/user/.nvm/versions/node/v24.22.1/bin/node
Command-line arguments (argv): [
  '/home/user/.nvm/versions/node/v24.22.1/bin/node',
  '/home/user/javascript-async-lab/01-nodejs-fundamentals/console-process.js'
]
```

### 4. Understanding the Output

- `process.platform` identifies the operating system running Node.js.
- `process.pid` changes every time we run the command because the operating system creates a new process for each execution.
- `process.cwd()` shows the folder from which we ran the `node` command.
- `process.argv` always contains at least two elements:
  1. `process.argv[0]`: The path to the `node` executable.
  2. `process.argv[1]`: The path to the JavaScript file being executed.

### 5. What I Learned

The `process` object bridges our JavaScript code with the operating system. Through `process`, a Node.js program knows its OS platform, process ID, working directory, executable path, and command-line arguments.

### 6. Questions to Revisit

1. Why does `process.pid` change each time you run the script?
2. What is the difference between `process.cwd()` and `process.execPath`?
3. What are the first two items inside `process.argv`?

---

## Lesson 5: What Is `console`, and How Does Output Actually Work?

`console.log` is the very first function most developers run in JavaScript. Now let's inspect what `console` actually is and how it prints text to our terminal in Node.js.

### 1. Is `console` Part of the JavaScript Engine or the Runtime?

`console` is provided by the **host runtime environment** (both browsers and Node.js implement it), not by the core ECMAScript language specification alone.

- In a **browser**, `console.log()` sends output to the Browser Developer Tools Console tab.
- In **Node.js**, `console.log()` sends output to the terminal's **standard output stream** (`process.stdout`), and `console.error()` sends output to the **standard error stream** (`process.stderr`).

### 2. Useful `console` Methods

| Method | Purpose | Output Stream in Node.js |
|---|---|---|
| `console.log()` | Prints general output followed by a newline (`\n`) | `process.stdout` |
| `console.error()` | Prints error messages followed by a newline (`\n`) | `process.stderr` |
| `console.table()` | Formats arrays or objects as a readable ASCII table | `process.stdout` |
| `console.time()` / `console.timeEnd()` | Measures and prints the elapsed time between two points | `process.stdout` |

### 3. Experiment: Inspect `console` and Compare with `process.stdout`

Create the file `01-nodejs-fundamentals/console.js`:

```javascript
console.log("1. Standard console.log message");
console.error("2. Standard console.error message");

process.stdout.write("3. Direct write to process.stdout (notice we must add \\n manually)\n");

console.table({
  runtime: "Node.js",
  nodeVersion: process.version,
  v8Version: process.versions.v8,
});

console.time("loop-timer");
let sum = 0;
for (let i = 0; i < 100000; i++) {
  sum += i;
}
console.timeEnd("loop-timer");
```

Run:

```bash
node 01-nodejs-fundamentals/console.js
```

Expected output:

```text
1. Standard console.log message
2. Standard console.error message
3. Direct write to process.stdout (notice we must add \n manually)
┌─────────────┬──────────────────────┐
│ (index)     │ Values               │
├─────────────┼──────────────────────┤
│ runtime     │ 'Node.js'            │
│ nodeVersion │ 'v24.22.1'           │
│ v8Version   │ '13.6.233.17-node.58'│
└─────────────┴──────────────────────┘
loop-timer: 0.45ms
```

### 4. Understanding the Output

- Under the hood in Node.js, `console.log("text")` formats the value and calls `process.stdout.write("text\n")`.
- Unlike `console.log()`, calling `process.stdout.write()` directly does not automatically append a newline character (`\n`) at the end.
- `console.table()` and `console.time()` / `console.timeEnd()` are built-in diagnostic helpers that will be heavily useful when we measure synchronous blocking vs. asynchronous execution in later phases.

### 5. What I Learned

`console` is an object provided by the runtime environment. In Node.js, `console.log` is connected to the operating system's standard output stream (`process.stdout`), and `console` also includes inspection and timing tools like `console.table` and `console.time`.

### 6. Questions to Revisit

1. Where does `console.log` send output in a browser vs. in Node.js?
2. How is `console.log("Hello")` related to `process.stdout.write()` in Node.js?
3. What is the difference between `console.log()` and `console.error()`?
4. Why will `console.time()` and `console.timeEnd()` be useful in our async experiments?

---

## Lesson 6: Why Do Browsers Have `document` But Node.js Normally Doesn't?

In Lesson 1, we saw that `typeof document` is `"object"` in a browser and `"undefined"` in Node.js. Let's understand **why** these two environments are designed this way.

### 1. What Is `document` in a Browser?

When a web browser loads a website, it downloads an HTML file (like `index.html`) and parses its tags (`<html>`, `<body>`, `<button>`, `<p>`) into an in-memory tree structure called the **DOM (Document Object Model)**.

The browser exposes this tree to JavaScript as the global `document` object so your code can:
- Read or change text on the screen (`document.querySelector('h1').textContent = 'Hello'`).
- Listen for user clicks or keyboard input (`document.addEventListener('click', ...)`).
- Create or remove visual HTML elements dynamically.

### 2. Why Doesn't Node.js Have `document`?

Node.js does **not** render HTML pages, draw pixels, or open a graphical browser window. It runs directly in your operating system terminal or on a backend server.

Because there is no webpage loaded in Node.js:
- There is no HTML tree to represent, so creating a `document` object by default would make no sense and waste memory.
- Conversely, a browser does **not** give websites a `process` object or direct access to your computer's hard drive (`fs`), because allowing any random website to read your personal files or kill OS processes would be a massive security vulnerability!

| Question | Browser Runtime | Node.js Runtime |
|---|---|---|
| **Where does it run?** | Inside a sandboxed browser tab | Directly on the host operating system |
| **Does it render an HTML page?** | Yes — exposes `document` and `window` | No — `document` and `window` are `undefined` |
| **Can it directly access the OS & filesystem?** | No — blocked for user security | Yes — exposes `process`, `fs`, `os`, `http` |

*(Note: If a Node.js developer specifically wants to parse or test HTML on a server, they can install third-party packages like `jsdom` to simulate a fake `document`, which is why we say Node.js **normally** doesn't have `document`.)*

### 3. Experiment: Try Accessing `document` in Node.js

Create the file `01-nodejs-fundamentals/why-no-document.js`:

```javascript
console.log("=== 1. Checking for Browser DOM APIs in Node.js ===");
console.log("typeof window:", typeof window);
console.log("typeof document:", typeof document);

console.log("\n=== 2. What happens if we try to use document in Node.js? ===");
try {
  const button = document.querySelector("button");
  console.log("Found button:", button);
} catch (error) {
  console.log("Caught ErrorName:", error.name);
  console.log("Caught Message:", error.message);
}

console.log("\n=== 3. Why doesn't Node.js have document, and what does it have instead? ===");
console.log("Browser's job: Render HTML/CSS pixels and handle user clicks -> needs `document` and `window`.");
console.log("Node.js's job: Run headless on a computer/server -> needs OS access via `process`:");
console.log("  -> Current Working Directory (process.cwd()):", process.cwd());
console.log("  -> OS Architecture (process.arch):", process.arch);
console.log("  -> Memory Usage (process.memoryUsage().rss):", process.memoryUsage().rss, "bytes");
```

Run:

```bash
node 01-nodejs-fundamentals/why-no-document.js
```

Expected output:

```text
=== 1. Checking for Browser DOM APIs in Node.js ===
typeof window: undefined
typeof document: undefined

=== 2. What happens if we try to use document in Node.js? ===
Caught ErrorName: ReferenceError
Caught Message: document is not defined

=== 3. Why doesn't Node.js have document, and what does it have instead? ===
Browser's job: Render HTML/CSS pixels and handle user clicks -> needs `document` and `window`.
Node.js's job: Run headless on a computer/server -> needs OS access via `process`:
  -> Current Working Directory (process.cwd()): /home/user/javascript-async-lab
  -> OS Architecture (process.arch): x64
  -> Memory Usage (process.memoryUsage().rss): 40894464 bytes
```

### 4. What I Learned

Each runtime provides only the APIs that match its purpose and security model. Browsers render HTML pages for users and therefore provide `document`, while blocking direct OS access. Node.js runs headless on the operating system and therefore provides `process` and file/network APIs, while omitting `document`.

### 5. Questions to Revisit

1. What does the `document` object represent in a web browser?
2. Why does attempting to call `document.querySelector()` in Node.js throw a `ReferenceError`?
3. Why don't web browsers give websites access to Node.js APIs like `process` or the local file system?
4. Why did we say `document` is *normally* unavailable in Node.js rather than *impossible* to have?

---

## Lesson 7: What Is NVM, and Why Did We Use It?

When we set up our environment, we used **NVM (Node Version Manager)** instead of installing Node.js with `sudo apt install nodejs` or downloading a system-wide installer. Let's understand what NVM actually does on our machine.

### 1. The Problem With System-Wide Node.js Installations

If you install Node.js directly into your operating system's global directory (like `/usr/bin/node`):
1. **You can only have one version installed at a time.** If Project A requires Node.js v20 and Project B requires Node.js v24, you are stuck uninstalling and reinstalling Node.js manually.
2. **Permission issues (`sudo`).** System directories belong to the `root` user, which often forces developers to use `sudo` when installing global tools—a major security and permission anti-pattern.

### 2. How NVM Solves This

**NVM (Node Version Manager)** installs every Node.js version inside a hidden folder in your own user home directory (`~/.nvm/versions/node/`).

When you run `nvm use 24`, NVM simply updates your terminal shell's `PATH` environment variable so that typing `node` points to `~/.nvm/versions/node/v24.x.x/bin/node`.

| Feature | System Install (`apt` / Global Installer) | NVM (Node Version Manager) |
|---|---|---|
| **Install Location** | `/usr/bin/node` or `/usr/local/bin/node` | `~/.nvm/versions/node/<version>/bin/node` |
| **Multiple Node Versions?** | No — one version overwrites another | Yes — switch anytime with `nvm use <version>` |
| **Requires `sudo` (root)?** | Yes | No — lives entirely inside your user account |

### 3. Useful NVM Commands

```bash
# List all Node.js versions currently installed on your machine
nvm ls

# Install a specific version of Node.js
nvm install 22

# Switch the current terminal session to a specific version
nvm use 24

# Show which Node version is currently active
nvm current
```

### 4. Experiment: Verify How NVM Runs Node.js From Inside JavaScript

Create the file `01-nodejs-fundamentals/nvm-check.js`:

```javascript
console.log("=== Inspecting How NVM Manages Node.js ===");

// 1. Where does the running `node` binary actually live on disk?
console.log("1. Active Node binary path (process.execPath):");
console.log("  ", process.execPath);

// 2. What Node version is currently active?
console.log("\n2. Active Node version (process.version):");
console.log("  ", process.version);

// 3. Inspect NVM environment variables injected into our shell
console.log("\n3. NVM Environment Variables:");
console.log("   NVM_DIR:", process.env.NVM_DIR || "Not set (Node might be installed globally without NVM)");
console.log("   NVM_BIN:", process.env.NVM_BIN || "Not set");

// 4. Check if our node executable lives inside NVM_DIR
const isManagedByNvm = process.env.NVM_DIR
  ? process.execPath.startsWith(process.env.NVM_DIR)
  : false;

console.log("\n4. Is this Node process running from an NVM-managed directory?");
console.log("  ", isManagedByNvm);
```

Run:

```bash
node 01-nodejs-fundamentals/nvm-check.js
```

Expected output on an NVM setup:

```text
=== Inspecting How NVM Manages Node.js ===
1. Active Node binary path (process.execPath):
   /home/user/.nvm/versions/node/v24.22.1/bin/node

2. Active Node version (process.version):
   v24.22.1

3. NVM Environment Variables:
   NVM_DIR: /home/user/.nvm
   NVM_BIN: /home/user/.nvm/versions/node/v24.22.1/bin

4. Is this Node process running from an NVM-managed directory?
   true
```

### 5. What I Learned

NVM is not Node.js itself—it is a shell tool that downloads and manages multiple isolated versions of Node.js inside `~/.nvm`. By updating our shell's `PATH` (via `NVM_BIN`), NVM lets us switch Node.js versions per project without needing `sudo`.

### 6. Questions to Revisit

1. What happens if you work on two projects that require different Node.js versions and you don't use a version manager like NVM?
2. Where on your hard drive does NVM store installed Node.js versions?
3. How does `process.execPath` prove that our running `node` command comes from NVM rather than `/usr/bin/node`?