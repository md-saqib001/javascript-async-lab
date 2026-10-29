console.log("=== The Synchronous Call Stack ===");

function sharpenKnife() {
  console.log("    🔪 [3] Sharpening knife... (Top of stack)");
  // The engine cannot leave this function until the closing brace is reached.
  console.log("    🔪 [4] Knife is sharp. Popping off stack.");
}

function chopOnion() {
  console.log("  🧅 [2] Pausing onion chopping to sharpen knife...");
  
  // The moment we call this, chopOnion() is FROZEN in memory. 
  // The engine pushes sharpenKnife() onto the stack and jumps into it.
  sharpenKnife(); 
  
  // This line CANNOT execute until sharpenKnife() completely finishes.
  console.log("  🧅 [5] Resuming and finishing onion. Popping off stack.");
}

function makeBurger() {
  console.log("🍔 [1] Starting burger. Need an onion...");
  
  // makeBurger() is FROZEN. Engine pushes chopOnion() onto the stack.
  chopOnion();
  
  console.log("🍔 [6] Onion added. Burger complete! Popping off stack.");
}

// Kick off the global execution
makeBurger();