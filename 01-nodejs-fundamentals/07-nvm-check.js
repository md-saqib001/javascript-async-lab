console.log("=== Inspecting How NVM Manages Node.js ===");

// 1. Where does the running `node` binary actually live on disk?
console.log("1. Active Node binary path (process.execPath):");
console.log("  ", process.execPath);

// 2. What Node version is currently active?
console.log("\n2. Active Node version (process.version):");
console.log("  ", process.version);

// 3. Inspect NVM environment variables injected into our shell
console.log("\n3. NVM Environment Variables:");
console.log("   NVM_DIR:", process.env.NVM_DIR || "Not set (Node might be installed globally without NVM)");
console.log("   NVM_BIN:", process.env.NVM_BIN || "Not set");

// 4. Check if our node executable lives inside NVM_DIR
const isManagedByNvm = process.env.NVM_DIR
  ? process.execPath.startsWith(process.env.NVM_DIR)
  : false;

console.log("\n4. Is this Node process running from an NVM-managed directory?");
console.log("  ", isManagedByNvm);