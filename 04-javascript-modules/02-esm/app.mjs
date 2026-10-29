// app.mjs - Consuming the ES Module
// ESM requires the exact file path including the extension!
import { add, multiply } from "./math.mjs";

console.log("=== ES Modules Calculator ===");
console.log("5 + 3 =", add(5, 3));
console.log("5 * 3 =", multiply(5, 3));