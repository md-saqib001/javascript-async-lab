function connectToDatabase() {
  console.log("3. Attempting database connection...");
  // throw stops execution immediately and bubbles up the Call Stack
  // new Error() generates the Stack Trace object
  throw new Error("FATAL: Database credentials rejected!");
}

function initializeApp() {
  console.log("2. App initializing...");
  connectToDatabase(); 
}

function main() {
  console.log("1. Starting main program...");
  initializeApp();
}

// Kick it off
main();