// app.js - Consuming the CommonJS Module
// require() reads the file, executes it, and returns whatever was assigned to module.exports
const math = require("./math.js");

console.log("=== CommonJS Calculator ===");
console.log("5 + 3 =", math.add(5, 3));
console.log("5 * 3 =", math.multiply(5, 3));

// Let's try to access the private variable
console.log("Can we access secretPi?", math.secretPi);