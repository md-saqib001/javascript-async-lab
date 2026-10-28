# Phase 02 — npm and Packages

## Goal

Understand what a package and a dependency actually are, how Node.js searches for packages on disk, why `node_modules` exists, and how `npm` automates dependency management.

---

## Lesson 1: What Is a Package, and How Does Node.js Find It?

### 1. Why Do We Need Packages?

When building real-world software, writing every single layer from scratch is impractical and error-prone. Consider what a production backend requires:
- **Cryptography (`bcrypt` / `argon2`):** Securely hashing passwords requires audited mathematical algorithms and C++ bindings. A tiny mistake in a custom implementation creates severe security vulnerabilities.
- **Database Drivers (`pg` / `mongoose`):** Talking to PostgreSQL or MongoDB requires managing raw TCP socket pools, parsing binary wire protocols, and handling SSL handshakes.
- **Data Validation & Networking (`zod` / `express` / `fastify`):** Parsing complex HTTP requests, validating schemas, and routing traffic reliably.

A **package** is a reusable directory of code (containing JavaScript files and a `package.json` description file) written and tested to solve a specific engineering problem.

When your project relies on a package to work, that package is called a **dependency**.

### 2. How Does Node.js Search for a Package?

When we write `require("some-package")` in Node.js (without a `./` or `/` file path prefix), Node.js assumes we are asking for a package inside a `node_modules` directory.

To find it, Node.js uses a **parent-directory climbing algorithm** stored in `module.paths`:
1. First, it checks for a `node_modules` folder inside the **current directory** where the script lives.
2. If not found, it climbs **one directory up** (`..`) and checks for `node_modules` there.
3. It repeats this step-by-step all the way up to the root of the filesystem (`/node_modules`).
4. If the package is not found in any of those directories, Node.js throws a `MODULE_NOT_FOUND` error.

**Why does Node climb up parent directories?**
In a real project with many subfolders (`01-nodejs-fundamentals/`, `02-npm-and-packages/`, `src/controllers/`), climbing up parent directories allows us to keep **one single `node_modules` folder at the root of the repository**, and scripts inside any subfolder can still find and load those packages automatically.

### 3. Experiment: Inspect `module.paths` and Trigger `MODULE_NOT_FOUND`

File: `02-npm-and-packages/01-missing-package.js`

```javascript
console.log("Where does Node look for packages?", module.paths);

// This package does NOT exist in any of the node_modules paths above:
const missingPkg = require("some-package-that-does-not-exist");
```

Run:

```bash
node 02-npm-and-packages/01-missing-package.js
```

Observed output:

```text
Where does Node look for packages? [
  '/home/mdsaqib/Projects/Learnables/javascript-async-lab/02-npm-and-packages/node_modules',
  '/home/mdsaqib/Projects/Learnables/javascript-async-lab/node_modules',
  '/home/mdsaqib/Projects/Learnables/node_modules',
  '/home/mdsaqib/Projects/node_modules',
  '/home/mdsaqib/node_modules',
  '/home/node_modules',
  '/node_modules'
]
node:internal/modules/cjs/loader:1568
  throw err;
  ^

Error: Cannot find module 'some-package-that-does-not-exist'
Require stack:
- /home/mdsaqib/Projects/Learnables/javascript-async-lab/02-npm-and-packages/01-missing-package.js
...
  code: 'MODULE_NOT_FOUND'
```

### 4. Key Takeaways

- A **package** is a reusable folder of code; a **dependency** is a package your project relies on.
- `module.paths` shows the exact list of `node_modules` directories Node.js searches from innermost folder to filesystem root.
- If Node checks every path in `module.paths` and cannot find the requested package folder, execution stops with `code: 'MODULE_NOT_FOUND'`.

### 5. Questions to Revisit

1. What is the difference between a package and a dependency?
2. Why don't engineers write database drivers or password-hashing algorithms from scratch in every project?
3. In what order does Node.js search directories when you call `require("pkg-name")`?
4. Why is the parent-directory climbing behavior useful for multi-folder projects?

---

## Lesson 2: Demystifying `node_modules` (Creating a Package Without `npm`)

### 1. Is `node_modules` Magic?

Beginners often think `node_modules` is a special binary database that only `npm` can create or understand.

In reality:
- **Node.js** only cares that a folder named `node_modules/<package-name>` exists in one of the `module.paths` locations and contains an entry file (by default, `index.js`).
- **Node.js does not know or care whether `npm` put that folder there or whether you created it by hand!**

### 2. Experiment: Create a Package Inside `node_modules` by Hand

First, we manually create a `node_modules/magic-color-printer` directory and place an `index.js` file inside it without touching `npm`:

```bash
mkdir -p 02-npm-and-packages/node_modules/magic-color-printer
```

File: `02-npm-and-packages/node_modules/magic-color-printer/index.js`

```javascript
module.exports = function(text) {
  return "🚀 [Loaded from node_modules]: " + text;
};
```

Next, we create our script that requires `magic-color-printer`:

File: `02-npm-and-packages/02-manual-node-modules.js`

```javascript
// We created 02-npm-and-packages/node_modules/magic-color-printer/index.js manually
// using mkdir and cat — without running `npm` at all!
const colorTool = require("magic-color-printer");

console.log(colorTool("Wait... we didn't even use npm!"));
```

Run:

```bash
node 02-npm-and-packages/02-manual-node-modules.js
```

Observed output:

```text
🚀 [Loaded from node_modules]: Wait... we didn't even use npm!
```

### 3. Understanding the Output

1. When `require("magic-color-printer")` ran, Node checked the first path in `module.paths`: `02-npm-and-packages/node_modules`.
2. It found the `magic-color-printer` folder we created manually.
3. By default, when given a folder, Node looks for `index.js` inside that folder, executes it, and returns whatever was assigned to `module.exports`.

### 4. Wait — If We Can Do This Manually, Why Do We Need `npm`?

In our experiment, `magic-color-printer` had only **3 lines of code** and **zero dependencies of its own**.

In the real world, a package like `express` depends on **30+ other packages**, and those packages depend on **dozens more** (transitive dependencies). Downloading, extracting, version-matching, and security-verifying 60+ nested folders by hand would take hours and constantly break.

That is the exact division of labor:
- **`node` (The Runtime):** Knows how to *find and execute* code inside `node_modules/`.
- **`npm` (The Package Manager):** Is the automation tool that *downloads, resolves, and organizes* third-party packages from the online npm registry into `node_modules/`.

### 5. Questions to Revisit

1. Does Node.js require `npm` in order to load a package from `node_modules`?
2. When you call `require("magic-color-printer")`, what filename inside the `magic-color-printer` folder does Node look for by default?
3. Why is manually creating folders inside `node_modules` impractical for real-world packages like `express`?
4. Why did we use `git add -f` to commit `02-npm-and-packages/node_modules/magic-color-printer/index.js` when `node_modules` is normally in `.gitignore`?