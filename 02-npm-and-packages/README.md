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

---

## Lesson 3: Using `npm` for Real (The Registry vs. The CLI)

### 1. The Two Parts of `npm`

When developers say `"npm"`, they are referring to two distinct components working together:

| Component | What It Is | What It Does |
|---|---|---|
| **The npm Registry** (`registry.npmjs.org`) | A public cloud database hosting over 2 million JavaScript packages | Stores compressed `.tgz` archives (tarballs) of every published version of open-source packages |
| **The `npm` CLI** (installed alongside `node`) | A command-line tool on your machine | Connects to the registry over HTTPS, downloads packages and their dependencies, verifies integrity hashes, and extracts them into `node_modules/` |

### 2. What Happens When You Run `npm install ms`?

From the root of our repository, we ran:

```bash
npm install ms
```

Behind the scenes, the `npm` CLI:
1. Contacted `https://registry.npmjs.org/ms` and downloaded the compressed package archive.
2. Extracted the source code (`index.js`, `package.json`, `readme.md`, `license.md`) into our repository's root `node_modules/ms/` folder.
3. Recorded `ms` inside `package.json` and `package-lock.json` at the root of the repository.

When we inspected `node_modules/ms/index.js`, we saw that a published npm package is just ordinary JavaScript functions exported via `module.exports`.

### 3. Experiment: Use a Real Package Installed at the Repository Root

File: `02-npm-and-packages/03-real-npm-package.js`

```javascript
// Notice: We did NOT put `ms` inside `02-npm-and-packages/node_modules`!
// `npm install ms` put it in the ROOT `javascript-async-lab/node_modules/ms`.
// Because Node climbs up parent folders (`module.paths`), it finds it automatically!
const ms = require("ms");

console.log("=== Converting human time to milliseconds ===");
console.log("2 seconds in ms:", ms("2s"));
console.log("5 minutes in ms:", ms("5m"));
console.log("2 days in ms:   ", ms("2 days"));

console.log("\n=== Converting milliseconds back to human time ===");
console.log("60000 ms is:    ", ms(60000, { long: true }));
console.log("172800000 ms is:", ms(172800000, { long: true }));

console.log("\n=== Exact file path Node loaded `ms` from ===");
console.log(require.resolve("ms"));
```

Run:

```bash
node 02-npm-and-packages/03-real-npm-package.js
```

Observed output:

```text
=== Converting human time to milliseconds ===
2 seconds in ms: 2000
5 minutes in ms: 300000
2 days in ms:    172800000

=== Converting milliseconds back to human time ===
60000 ms is:     1 minute
172800000 ms is: 2 days

=== Exact file path Node loaded `ms` from ===
/home/mdsaqib/Projects/Learnables/javascript-async-lab/node_modules/ms/index.js
```

### 4. Understanding the Output

- Even though `03-real-npm-package.js` is inside `02-npm-and-packages/`, calling `require("ms")` automatically climbed one directory up to `javascript-async-lab/node_modules/ms/index.js`.
- `require.resolve("ms")` runs Node's module resolution algorithm and returns the exact absolute path to the entry file without executing it.

### 5. Questions to Revisit

1. What is the difference between the npm Registry and the `npm` CLI?
2. Why was `02-npm-and-packages/03-real-npm-package.js` able to find `ms` even though `ms` was installed in the root `node_modules/` directory?
3. What does `require.resolve("ms")` return compared to `require("ms")`?

---

## Lesson 4: Direct vs. Transitive Dependencies

### 1. Why Does Installing 1 Package Create Multiple Folders in `node_modules`?

When we installed `ms`, only 1 folder was added to `node_modules` because `ms` has zero dependencies of its own.

However, most packages build upon other packages:
- **Direct Dependency:** A package that **your project** explicitly installs and imports (e.g., `ms`, `http-errors`).
- **Transitive (Indirect) Dependency:** A package that one of **your direct dependencies** requires under the hood in order to function.

### 2. Inspecting the Dependency Tree

When we ran `npm install http-errors` and inspected the dependency tree with `npm ls --all`:

```bash
npm install http-errors
npm ls --all
```

Observed output:

```text
javascript-async-lab@ /home/mdsaqib/Projects/Learnables/javascript-async-lab
├─┬ http-errors@2.0.1
│ ├── depd@2.0.0
│ ├── inherits@2.0.4
│ ├── setprototypeof@1.2.0
│ ├── statuses@2.0.2
│ └── toidentifier@1.0.1
└── ms@2.1.3
```

Even though we only installed **2 direct dependencies** (`ms` and `http-errors`), our `node_modules` folder now contains **7 packages** (`depd`, `http-errors`, `inherits`, `ms`, `setprototypeof`, `statuses`, `toidentifier`) because `http-errors` has 5 transitive dependencies listed in its own `package.json`.

### 3. Why Are Transitive Dependencies Placed Flat in the Root `node_modules/`? (Hoisting)

Instead of nesting `statuses` inside `node_modules/http-errors/node_modules/statuses`, `npm` places (**hoists**) it flat at the top level: `node_modules/statuses`.

- **How `http-errors` finds it:** When `node_modules/http-errors/index.js` calls `require("statuses")`, Node checks `node_modules/http-errors/node_modules` first, doesn't find it, climbs up to the root `node_modules/statuses`, and loads it.
- **Why hoisting is beneficial:** If another package (like `express`) also depends on `statuses@2.0.2`, both packages can share that single hoisted folder in the root `node_modules/` instead of duplicating copies on disk.
- **What if two packages need incompatible versions of `statuses`?** `npm` keeps one version hoisted at the root `node_modules/statuses` and nests the conflicting version inside `node_modules/<other-pkg>/node_modules/statuses` so each package resolves the exact version it needs!

### 4. Experiment: Inspect Direct and Transitive Dependencies in Code

File: `02-npm-and-packages/04-direct-vs-transitive.js`

```javascript
// 1. Load our DIRECT dependency (`http-errors`)
const createError = require("http-errors");

// Create a 404 HTTP Error object
const err = createError(404, "User profile not found in database");

console.log("=== 1. Using our Direct Dependency (http-errors) ===");
console.log("Error Status Code:", err.statusCode);
console.log("Error Name:       ", err.name);
console.log("Error Message:    ", err.message);

// 2. Read http-errors's own package.json to see what it depends on!
const httpErrorsPkg = require("http-errors/package.json");

console.log("\n=== 2. Transitive Dependencies Required by http-errors ===");
console.table(httpErrorsPkg.dependencies);

// 3. Prove where Node resolved both the Direct and Transitive dependencies from:
console.log("\n=== 3. Where did Node load them from on disk? ===");
console.log("Direct (http-errors):  ", require.resolve("http-errors"));
console.log("Transitive (statuses): ", require.resolve("statuses"));
```

Run:

```bash
node 02-npm-and-packages/04-direct-vs-transitive.js
```

Observed output:

```text
=== 1. Using our Direct Dependency (http-errors) ===
Error Status Code: 404
Error Name:        NotFoundError
Error Message:     User profile not found in database

=== 2. Transitive Dependencies Required by http-errors ===
┌────────────────┬──────────┐
│ (index)        │ Values   │
├────────────────┼──────────┤
│ depd           │ '~2.0.0' │
│ inherits       │ '~2.0.4' │
│ setprototypeof │ '~1.2.0' │
│ statuses       │ '~2.0.2' │
│ toidentifier   │ '~1.0.1' │
└────────────────┴──────────┘

=== 3. Where did Node load them from on disk? ===
Direct (http-errors):   /home/mdsaqib/Projects/Learnables/javascript-async-lab/node_modules/http-errors/index.js
Transitive (statuses):  /home/mdsaqib/Projects/Learnables/javascript-async-lab/node_modules/statuses/index.js
```

### 5. Questions to Revisit

1. What is the difference between a direct dependency and a transitive dependency?
2. How does `npm` know which transitive dependencies a package requires?
3. What does dependency **hoisting** mean, and how does it save disk space?
4. How do Node.js and `npm` allow two different packages in the same project to use two different, incompatible versions of the same transitive dependency?


## Lesson 5: Semantic Versioning and Local vs. Global Installs

### 1. The Problem with Unpredictable Updates

If a project relies on `express` version `4.1.0`, and the authors release version `5.0.0` with completely rewritten routing logic, automatically upgrading would crash your application.

To solve this, the npm ecosystem uses **Semantic Versioning (SemVer)**, formatted as `Major.Minor.Patch` (e.g., `2.14.3`):
- **Major (2):** Breaking changes. If this number increases, old code might break. Manual testing is required.
- **Minor (14):** New features. Backward compatible. Safe to update.
- **Patch (3):** Bug fixes. Always safe to update immediately.

### 2. The Magic Prefixes (`^` and `~`)

Look inside your `package.json` dependencies:
```json
"dependencies": {
  "http-errors": "^2.0.1",
  "ms": "^2.1.3"
}

```

* **Caret (`^`) — Safe Feature Updates:** `^2.1.3` tells npm, *"Accept any newer Minor or Patch versions (like 2.5.0), but NEVER install 3.x.x."*
* **Tilde (`~`) — Bug Fixes Only:** `~2.0.2` tells npm, *"Only accept Patch updates (like 2.0.9), but NEVER install 2.1.0."*

### 3. Local Installs, Global Installs, and `npx`

1. **Local Install (`npm install ms`):** Downloads the package into the current folder's `node_modules/`. This is the standard for packages you `require()` in your code.
2. **Global Install (`npm install -g nodemon`):** Installs a package directly into your operating system environment so it can be used as a terminal command anywhere. **Anti-pattern warning:** Global installs cause conflicts when Project A needs version 1 and Project B needs version 3 of the same tool.
3. **`npx` (Node Package Execute):** The modern alternative to global installs. `npx` temporarily downloads a terminal tool, runs it once, and throws it away (or uses the local version if one exists in your project).

### 4. Experiment: Parse SemVer and Run a Temporary CLI Tool

File: `02-npm-and-packages/05-semver-parser.js`

```javascript
const versionString = "2.14.3";
const [major, minor, patch] = versionString.split(".");

console.log("=== Semantic Versioning Decoder ===");
console.log(`Original:  ${versionString}`);
console.log(`Major (${major}): Breaking changes. Code rewrites needed.`);
console.log(`Minor (${minor}): New features. Backwards compatible.`);
console.log(`Patch (${patch}): Bug fixes. Always safe to update.`);

```

Run the parser, check for updates, and use `npx`:

```bash
node 02-npm-and-packages/05-semver-parser.js
npm outdated
npx cowsay "Semantic Versioning is actually pretty smart!"

```

Observed output:

* The parser split the version into Major, Minor, and Patch.
* `npm outdated` returned empty, proving our locally installed packages match the latest allowed versions in the npm registry.
* `npx` successfully downloaded the `cowsay` CLI tool, printed an ASCII cow to the terminal, and exited without leaving `cowsay` permanently installed on our global system path.

### 5. Questions to Revisit

1. Why would an engineer use `^2.1.3` instead of locking the version strictly to `"2.1.3"`?
2. What does a Major version bump indicate to developers using that package?
3. Why is `npx` generally preferred over `npm install -g` for running terminal tools?

