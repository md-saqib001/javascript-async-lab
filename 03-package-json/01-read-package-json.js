// We can use require() to load JSON files directly into JavaScript objects!
const projectMetadata = require("../package.json");

console.log("=== Project Blueprint (package.json) ===");
console.log("Name:", projectMetadata.name);
console.log("Version:", projectMetadata.version);
console.log("Main Entry File:", projectMetadata.main);

console.log("\n=== Production Dependencies ===");
// This will show the `ms` and `http-errors` packages we installed in Phase 02
console.table(projectMetadata.dependencies || {});

console.log("\n=== Development Dependencies ===");
console.table(projectMetadata.devDependencies || { "No devDependencies found": true });