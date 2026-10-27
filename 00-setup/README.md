# Phase 00 — Environment Setup & Sanity Check

## Goal
Verify that our development environment, version manager (NVM), and Node.js CLI binary are properly installed and capable of executing JavaScript outside the browser.

---

## 1. Why Did We Use NVM (Node Version Manager)?

Different projects often require different versions of Node.js. If you install Node.js globally using a standard system installer, your machine is locked into a single version.

**NVM (Node Version Manager)** solves this by:
- Installing multiple Node.js versions side-by-side inside your user directory (`~/.nvm/versions/node/`).
- Dynamically updating your shell's `PATH` so the `node` command points to whichever version you select (e.g., `nvm use 24`).
- Allowing you to switch versions instantly without needing `sudo` or root permissions.

---

## 2. Inspecting the `node` Binary from the Terminal

Before running a file, we can verify which Node.js executable our shell is using:

```bash
# 1. Check the installed Node.js version
node --version

# 2. See the exact file path the shell resolves when we type 'node'
which node

# 3. Ask Node itself for the absolute path to its running binary
node -p "process.execPath"

# 4. Evaluate a quick JavaScript expression inline and print the result
node -p "1 + 2"