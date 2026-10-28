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