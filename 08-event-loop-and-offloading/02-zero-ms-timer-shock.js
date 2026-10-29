console.log("1. Program started (Synchronous)");

// We schedule a timer for ZERO milliseconds.
// The OS finishes this instantly and drops the callback into the Task Queue.
setTimeout(() => {
  console.log("3. ⏰ Zero-MS Timer Callback executed! (Asynchronous)");
}, 0);

console.log("2. Program ending (Synchronous)");

// Right here, the global execution context finishes.
// The Call Stack FINALLY empties. 
// The Event Loop sees the empty stack, grabs the timer callback from the Task Queue, 
// and pushes it onto the Call Stack.