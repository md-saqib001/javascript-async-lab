console.log("=== Raw Argument Vector (process.argv) ===");
// process.argv is just an array of strings!
console.log(process.argv);

console.log("\n=== Breaking it Down ===");
console.log("1. Absolute path to Node binary: ", process.argv[0]);
console.log("2. Absolute path to this script: ", process.argv[1]);

console.log("\n=== Custom Arguments ===");
// Our custom arguments always start at index 2
const customArgs = process.argv.slice(2);

if (customArgs.length === 0) {
  console.log("No custom arguments provided!");
} else {
  console.log("You passed:", customArgs);
  
  // Let's do some basic manual parsing
  customArgs.forEach(arg => {
    if (arg.startsWith("--user=")) {
      const username = arg.split("=")[1];
      console.log(`👋 Hello, ${username}!`);
    }
  });
}