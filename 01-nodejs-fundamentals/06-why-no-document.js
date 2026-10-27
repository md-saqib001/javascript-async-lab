console.log("=== 1. Checking for Browser DOM APIs in Node.js ===");
console.log("typeof window:", typeof window);
console.log("typeof document:", typeof document);

console.log("\n=== 2. What happens if we try to use document in Node.js? ===");
try {
  // In a browser, this finds an HTML element on the page.
  // In Node.js, there is no HTML page or DOM tree rendered on screen!
  const button = document.querySelector("button");
  console.log("Found button:", button);
} catch (error) {
  console.log("Caught ErrorName:", error.name);
  console.log("Caught Message:", error.message);
}

console.log("\n=== 3. Why doesn't Node.js have document, and what does it have instead? ===");
console.log("Browser's job: Render HTML/CSS pixels and handle user clicks -> needs `document` and `window`.");
console.log("Node.js's job: Run headless on a computer/server -> needs OS access via `process`:");
console.log("  -> Current Working Directory (process.cwd()):", process.cwd());
console.log("  -> OS Architecture (process.arch):", process.arch);
console.log("  -> Memory Usage (process.memoryUsage().rss):", process.memoryUsage().rss, "bytes");