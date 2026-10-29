console.log("=== App Starting ===");

// 1. App requires counter and adds a visit
const counter = require("./counter.js");
counter.addVisit();
console.log("App visits count:", counter.getVisits());

// 2. App requires worker.js (which ALSO requires counter.js internally!)
require("./worker.js");

// 3. Did the worker modify the exact same counter object?
console.log("App visits count after worker ran:", counter.getVisits());