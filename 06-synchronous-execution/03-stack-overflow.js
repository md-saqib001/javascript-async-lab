let frameCount = 0;

function inception() {
  frameCount++;
  
  // The function calls itself immediately, pushing a new frame onto the stack.
  // Because there is no `return` statement stopping it, it will never pop off!
  inception();
}

console.log("=== Starting infinite recursion ===");

// We wrap it in a try/catch so our program doesn't completely die when the stack blows up
try {
  inception();
} catch (error) {
  console.log(`💥 BOOM! The Call Stack exploded!`);
  console.log(`Total stack frames created before crash: ${frameCount}`);
  console.log(`Error type: ${error.name}`);
  console.log(`Error message: ${error.message}`);
}