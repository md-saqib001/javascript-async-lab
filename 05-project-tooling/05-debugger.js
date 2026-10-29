function calculateTotal(prices) {
  let total = 0;
  
  for (let i = 0; i < prices.length; i++) {
    // 🚨 TRIPWIRE! If a debugger is attached, the program will freeze here.
    // We can then hover over `total` and `prices[i]` to see their current values in memory.
    debugger; 
    
    total += prices[i];
  }
  
  return total;
}

console.log("🛒 Starting calculation...");
const finalTotal = calculateTotal([10, 25, 40]);
console.log("✅ Final Total is:", finalTotal);