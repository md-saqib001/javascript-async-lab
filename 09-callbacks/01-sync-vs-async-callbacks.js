console.log("1. Starting program");

const myNumbers = [1, 2, 3];

// --- SYNCHRONOUS CALLBACK ---
// Array.forEach runs a C++ loop that calls your callback immediately, 
// pausing the rest of the program until all 3 numbers are processed.
console.log("2. Running synchronous forEach...");
myNumbers.forEach((num) => {
  console.log(`   -> forEach callback executing for number: ${num}`);
});

// --- ASYNCHRONOUS CALLBACK ---
// setTimeout hands the callback to libuv and the Event Loop.
// It will not run until the Call Stack is completely empty.
console.log("3. Scheduling asynchronous setTimeout...");
setTimeout(() => {
  console.log("   -> ⏰ setTimeout callback executing!");
}, 0);

console.log("4. Program ending");