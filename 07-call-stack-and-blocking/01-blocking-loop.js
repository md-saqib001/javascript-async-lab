console.log("1. Program started.");
console.log("2. Preparing to block the thread...");

const startTime = Date.now();
let loops = 0;

// This is a CPU-bound task. The engine is trapped inside this while-loop 
// until exactly 3000 milliseconds have passed.
while (Date.now() - startTime < 3000) {
  loops++; // Just making the CPU do some meaningless math
}

const endTime = Date.now();

console.log(`3. Thread UNBLOCKED! Trapped for ${endTime - startTime}ms.`);
console.log(`4. The CPU completed ${loops.toLocaleString()} loops during that time.`);
console.log("5. Program finished.");