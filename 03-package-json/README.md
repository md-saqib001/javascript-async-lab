# Phase 03 — `package.json` and `package-lock.json`

## Goal
Understand the files that define a Node.js project, how dependency snapshots prevent code from breaking across different machines, and how npm automates terminal commands.

---

## Lesson 1: `package.json` & Project Identity

### 1. The Blueprint of a Project
A Node.js project without a `package.json` is just a random collection of scripts. Running `npm init -y` generates this file, which acts as the ID Card for your repository:
- **Identity:** Project `name`, `version`, and `description`.
- **Entry Point:** The `"main"` file that kicks off the program.
- **Dependencies:** The exact list of third-party packages required to run the code.

### 2. `dependencies` vs. `devDependencies`
- **`dependencies` (Production):** Packages your code physically needs to run (e.g., `express`, `pg`, `http-errors`). If you deploy to a server, these must be downloaded.
- **`devDependencies` (Development):** Packages you only use while writing the code (e.g., `jest` for testing, `eslint` for formatting). Production servers skip downloading these to save disk space and deployment time.

### 3. Experiment: Parse `package.json` Programmatically
Because `package.json` is a standard JSON file, Node.js can `require()` it directly.

File: `03-package-json/01-read-package-json.js`
```javascript
const projectMetadata = require("../package.json");

console.log("=== Project Blueprint (package.json) ===");
console.log("Name:", projectMetadata.name);
console.log("Version:", projectMetadata.version);

console.log("\n=== Production Dependencies ===");
console.table(projectMetadata.dependencies || {});
```
**Takeaway:** `package.json` is not a mysterious binary file; it's a simple, readable object that Node and npm use to understand your project.

---

## Lesson 2: The Lockfile (`package-lock.json`)

### 1. Why `package.json` Alone is Dangerous
If `package.json` specifies `"ms": "^2.1.3"`, npm is allowed to install version `2.1.4` or `2.9.9`. 
If you push this to GitHub, a coworker cloning the repo next month might get a newer, buggy version of the package. Your code will work on your laptop, but crash on theirs!

### 2. How the Lockfile Solves This
Whenever npm installs a package, it writes the exact result into `package-lock.json`. This file acts as a freeze-frame snapshot, recording:
1. **The Exact Resolved Version:** (e.g., exactly `2.1.3`, ignoring the `^`).
2. **The Integrity Hash:** A SHA-512 cryptographic fingerprint. If a hacker intercepts the npm download and alters the code, the hash changes and npm immediately blocks the installation.

### 3. Experiment: The Lockfile Inspector
File: `03-package-json/02-lockfile-inspector.js`
```javascript
const lockfile = require("../package-lock.json");

const msData = lockfile.packages["node_modules/ms"];
console.log("Package: ms");
console.log("  Exactly Installed:         ", msData.version);
console.log("  Security Hash (Integrity): ", msData.integrity);
```
**Takeaway:** `package-lock.json` is the ultimate source of truth for your dependencies, guaranteeing exact reproducibility and cryptographic security.

---

## Lesson 3: `npm install` vs. `npm ci`

### 1. The Two Installation Commands
- **`npm install` (The Developer Command):** Flexible and helpful. If you edit `package.json`, `npm install` will quietly update the lockfile to match. 
- **`npm ci` (Clean Install - The Server Command):** Strict and read-only. It is designed for production servers and automated pipelines.

### 2. What `npm ci` Actually Does:
1. It immediately **deletes** the existing `node_modules/` folder for a fresh start.
2. It ignores `package.json` and reads **only** `package-lock.json`.
3. If the two files conflict, it **crashes** instead of altering the lockfile.
4. It installs up to 3x faster because the lockfile already mapped out the exact dependency tree.

### 3. Experiment: Nuke and Rebuild
```bash
rm -rf node_modules
npm ci
```
**Takeaway:** You should always use `npm ci` when deploying code to guarantee the server runs the exact same code you tested on your laptop.

---

## Lesson 4: npm Scripts & `PATH` Magic

### 1. The Problem with Local Executables
If you install a CLI tool locally, it goes into `node_modules/.bin/`. Running the tool by typing its name in the terminal fails (`command not found`) because the OS doesn't look inside `node_modules`.

### 2. The Magic of `npm run`
When you define a script in `package.json` (`"lab-test": "node script.js"`) and execute it via `npm run lab-test`, npm intercepts the terminal session:
1. It temporarily adds `node_modules/.bin/` to your system's `PATH`.
2. It injects project metadata into the `process.env` variables.

### 3. Experiment: Catching npm in the Act
File: `03-package-json/03-custom-script-runner.js`
```javascript
console.log("Injected Package Name:", process.env.npm_package_name || "NOT SET");
console.log("Did npm add .bin to PATH?", process.env.PATH ? process.env.PATH.includes("node_modules/.bin") : false);
```

When run via `node`:
- Name: NOT SET
- PATH injected: false

When run via `npm run lab-test`:
- Name: javascript-async-lab
- PATH injected: true

**Takeaway:** `npm run` is not just an alias; it configures a specialized, isolated environment for your project scripts to run safely.