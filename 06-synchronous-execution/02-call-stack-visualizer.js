function third() {
  console.log("We are at the deepest level.");
  // This will force the V8 engine to print every Stack Frame currently in memory!
  console.trace("📸 SNAPSHOT OF THE CALL STACK");
}

function second() {
  third();
}

function first() {
  second();
}

console.log("=== Pushing frames onto the stack ===");
first();