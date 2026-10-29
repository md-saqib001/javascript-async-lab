console.log("=== How npm run modifies your environment ===");

// 1. Check if npm injected our package metadata
console.log("Injected Package Name:   ", process.env.npm_package_name || "NOT SET");
console.log("Injected Package Version:", process.env.npm_package_version || "NOT SET");

// 2. Check if npm modified our PATH to include node_modules/.bin
const pathIncludesBin = process.env.PATH 
  ? process.env.PATH.includes("node_modules/.bin") 
  : false;

console.log("\nDid npm temporarily add node_modules/.bin to our PATH?");
console.log("Answer: ", pathIncludesBin);