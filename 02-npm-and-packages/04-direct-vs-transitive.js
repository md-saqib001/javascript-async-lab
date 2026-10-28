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