# Phase 05 — Project Tooling and Debugging

## Goal
Bridge the gap between writing simple local scripts and operating robust, production-ready backend servers. Learn how to securely configure applications, survive fatal crashes, and surgically debug live memory.

---

## Lesson 1: Command Line Arguments (`process.argv`)

### 1. The "Why" and "When"
When you write a backend service, you want the code to be reusable. You shouldn't have to rewrite your server code just to change the port number from 3000 to 8080, or to switch from "development" mode to "production" mode. 

By passing arguments via the terminal (e.g., `node server.js --port=8080 --env=prod`), the DevOps team or a Docker container can dynamically configure how the app behaves at startup without ever touching the JavaScript source code. This is exactly how tools like `git` (or custom C++ CLI tools like `wgit`) accept commands.

### 2. How it Works under the Hood
The V8 Engine takes the raw terminal input and exposes it as an array of strings in `process.argv` (Argument Vector):
- `process.argv[0]` -> The absolute path to the Node binary executing the code.
- `process.argv[1]` -> The absolute path to the JS script being executed.
- `process.argv[2+]` -> Your custom flags (e.g., `--user=admin`).

*Real-world note: While we parsed this manually with `.split()`, production apps use packages like `commander` or `yargs` to automatically parse complex flags into clean JavaScript objects.*

---

## Lesson 2: Stack Traces and `try...catch`

### 1. The "Why" and "When"
Node.js is single-threaded. If one user triggers a critical error (like a database timeout or passing a null variable) and your program doesn't handle it, the entire Node process crashes. That means all 10,000 other users connected to your server instantly get disconnected. 

We use `try...catch` as a safety net. It intercepts the "bowling ball" of an error before it smashes into the Node runtime, allowing us to log the issue, return a 500 error to that specific user, and keep the server alive for everyone else.

### 2. Reading the Map (The LIFO Stack Trace)
When an error detonates, Node prints a **Stack Trace**. This is a literal snapshot of the Call Stack in memory at the exact millisecond of the crash. 
Because the Call Stack is a Last-In, First-Out (LIFO) data structure, the trace prints in **reverse order**. 
- The **top line** is the exact file and line number where the error exploded.
- The **lines below it** show the breadcrumb trail of which functions called which functions to get there.

---

## Lesson 3: Environment Variables (`.env`)

### 1. The "Why" and "When"
Command line arguments are great for configuration (like `--port=8080`), but they are terrible for secrets. If you pass an API key via the terminal (`node app.js --key=123`), anyone with access to the server can run the Linux `ps` command and see the secret in plain text. Furthermore, hardcoding secrets into your files means they get pushed to GitHub, which is a massive security breach.

We solve this using a hidden `.env` file that lives on the server and is strictly added to `.gitignore`. It separates our secure configuration from our code (a core principle of the "12-Factor App" backend methodology).

### 2. Native Loading in Node v20+
For years, developers had to install a 3rd-party package called `dotenv`. Now, Node.js can securely load these secrets natively:
```bash
node --env-file=.env my-script.js
```
The secrets are injected directly into the `process.env` object in memory, where your code can safely access them (e.g., `process.env.DATABASE_URL`).

---

## Lesson 4: The Debugger (`--inspect-brk`)

### 1. The "Why" and "When"
When you have a complex bug—like a shopping cart miscalculating a total across 50 variables, or a graph index losing pointers—using `console.log()` is like trying to fix a moving car by taking blurry photos as it drives by. You have to guess where the bug is, add a log, restart the server, and hope you guessed right.

The Node.js Inspector turns you into a surgeon. By typing the `debugger;` keyword in your code, you create a tripwire. 

### 2. Freezing Time
Running `node --inspect-brk my-script.js` tells the V8 engine to open a local WebSocket port (9229) and completely **freeze execution on line 1**. 
By navigating to `brave://inspect` or `chrome://inspect`, you attach a visual DevTools interface to your backend server. You can step through your code line-by-line, hover over variables to inspect live memory, and even modify variables on the fly to test fixes without restarting the server.

---

## Lesson 5: Built-in Modules ("Batteries Included")

### 1. The "Why" and "When"
While `npm` is great for complex tasks, Node.js provides heavily optimized, native C++ bindings for interacting directly with the operating system. We prefix these with `node:` to clearly indicate we are bypassing `npm` and talking directly to the core runtime.

### 2. Core Modules for Backend Engineers
- **`node:fs` (File System):** Used to read configuration files, write server logs to the hard drive, or load TLS/SSL certificates for HTTPS.
- **`node:path`:** Windows uses `\` for folder paths, while Linux uses `/`. The `path.join()` module safely calculates folder paths so your code runs flawlessly on any operating system.
- **`node:http`:** The raw engine for opening network ports and listening for web traffic (which frameworks like Express.js are built on top of).
- **`node:os`:** Used to check available CPU cores and RAM before spawning heavy background workers.