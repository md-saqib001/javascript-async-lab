function connectToDatabase() {
  throw new Error("FATAL: Database credentials rejected!");
}

function initializeApp() {
  connectToDatabase(); 
}

function main() {
  initializeApp();
}

console.log("=== Server Starting ===");

// We wrap the risky code in a `try` block
try {
  main();
} catch (error) {
  // If ANY function inside the `try` block throws an error, execution immediately 
  // teleports here. The `error` object contains the message and stack trace.
  console.log("\n🚨 CAUGHT AN ERROR! Preventing server crash...");
  console.log("Just the message: ", error.message);
  
  // We can choose to quietly log the stack trace to a file without crashing
  // console.log("The full stack: ", error.stack);
}

// Prove the server survived!
console.log("\n✅ Server is STILL RUNNING and ready for new users!");