console.log("=== 1. Starting Timeline Experiment ===");
const appStartTime = Date.now();

// --- THE SYNCHRONOUS WAY (Blocking) ---
console.log("\n[SYNC] Starting 2-second blocking wait...");
const syncStart = Date.now();
while (Date.now() - syncStart < 2000) { 
  // Trapping the Call Stack
}
console.log(`[SYNC] Finished blocking. Time elapsed: ${Date.now() - appStartTime}ms`);


// --- THE ASYNCHRONOUS WAY (Offloading) ---
console.log("\n[ASYNC] Scheduling 2-second setTimeout...");

// We hand this timer to Node's C++ background workers. 
// JavaScript DOES NOT wait here! It instantly moves to the next line.
setTimeout(() => {
  console.log(`\n[ASYNC CALLBACK] Timer finished! Time elapsed: ${Date.now() - appStartTime}ms`);
}, 2000);


console.log("\n=== 2. Main Script Finished ===");
console.log(`Total time for JavaScript to run this entire file: ${Date.now() - appStartTime}ms`);
console.log("Wait... did the main script finish BEFORE the timer?");