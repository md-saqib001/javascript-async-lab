// Load the lockfile into a JavaScript object
const lockfile = require("../package-lock.json");

console.log("=== Lockfile Metadata ===");
console.log("Lockfile Version:", lockfile.lockfileVersion);

console.log("\n=== Exact Resolved Versions & Security Hashes ===");

// In modern npm (v3 lockfiles), packages are stored under the "packages" object
// keyed by their exact directory path.
const msData = lockfile.packages["node_modules/ms"];
const httpErrorsData = lockfile.packages["node_modules/http-errors"];

console.log("Package: ms");
console.log("  Requested in package.json: ^2.1.3");
console.log("  Exactly Installed:         ", msData.version);
console.log("  Security Hash (Integrity): ", msData.integrity);

console.log("\nPackage: http-errors");
console.log("  Requested in package.json: ~2.0.1");
console.log("  Exactly Installed:         ", httpErrorsData.version);
console.log("  Security Hash (Integrity): ", httpErrorsData.integrity);