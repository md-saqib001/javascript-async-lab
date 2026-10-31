// This function mimics `fs.readFile`. It takes a path and a callback.
function readConfigFile(filePath, callback) {
  console.log(`\n[System] Attempting to read: ${filePath}`);
  
  setTimeout(() => {
    if (filePath === "bad/path.txt") {
      // 1. OPERATION FAILED: Pass the Error as the FIRST argument.
      const err = new Error("File not found on hard drive!");
      callback(err, null);
    } else {
      // 2. OPERATION SUCCEEDED: Pass null for the error, and the data as the SECOND.
      const fakeFileData = "{ port: 8080, db: 'postgres' }";
      callback(null, fakeFileData);
    }
  }, 1000);
}

// --- Test 1: Success Path ---
readConfigFile("config.json", (err, data) => {
  if (err) {
    console.log("❌ Failed to read config:", err.message);
    return; // Exit early!
  }
  console.log("✅ Success! Config loaded:", data);
});

// --- Test 2: Failure Path ---
readConfigFile("bad/path.txt", (err, data) => {
  // We MUST check `if (err)` as the very first line of the callback
  if (err) {
    console.log("❌ Failed to read config:", err.message);
    return;
  }
  console.log("✅ Success! Config loaded:", data);
});