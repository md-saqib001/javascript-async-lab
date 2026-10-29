// The "node:" prefix guarantees we are loading Node's internal C++ bindings,
// not a fake "fs" package someone maliciously published to npm.
const fs = require("node:fs");
const path = require("node:path");

console.log("=== Node.js Core Modules ===");

// 1. node:path - Safely build a path to THIS very file
// __dirname is a magic variable Node injects containing the current folder path
const myFilePath = path.join(__dirname, "06-built-in-modules.js");
console.log("Absolute Path:", myFilePath);

// 2. node:fs - Read the file synchronously from the hard drive
try {
  // We must specify "utf-8" so Node gives us a String instead of a raw Buffer of binary data
  const fileContents = fs.readFileSync(myFilePath, "utf-8");
  
  console.log("\n✅ Successfully read myself from the hard drive!");
  console.log(`This file is exactly ${fileContents.length} characters long.`);
  
} catch (error) {
  console.log("Failed to read file:", error.message);
}