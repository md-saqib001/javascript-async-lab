console.log("=== Starting Server ===");

let beatCount = 0;

// 1. We schedule a heartbeat to run EVERY 200 milliseconds.
// setInterval tells Node: "Please run this function in the background every 200ms."
const heartbeat = setInterval(() => {
  beatCount++;
  console.log(`  💓 Heartbeat ${beatCount}: App is alive and healthy!`);
}, 200);

// We wait 500ms to let the heartbeat print a few times before we drop the bomb.
setTimeout(() => {
  console.log("\n🚨 CRITICAL ALERT: A massive CPU task just hit the Call Stack!");
  console.log("The thread is now BLOCKED for 3 seconds...");
  
  const startTime = Date.now();
  // The bomb: A massive 3-second synchronous loop
  while (Date.now() - startTime < 3000) { 
    // The CPU is trapped here. It cannot pop this frame off the Call Stack.
  }
  
  console.log("✅ CPU task finished. Thread is UNBLOCKED.\n");
  
  // We stop the heartbeat so the script can finish gracefully
  clearInterval(heartbeat);
}, 500);