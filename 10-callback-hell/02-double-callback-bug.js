// --- PRETEND THIS IS A 3RD PARTY NPM PACKAGE ---
// You did not write this code. You are just using it.
function processStripePayment(amount, callback) {
  console.log(`[Stripe API] Processing payment for $${amount}...`);
  
  setTimeout(() => {
    // The library author made a mistake! 
    // They accidentally trigger the callback twice in certain edge cases.
    callback(null, "Payment Successful");
    callback(null, "Payment Successful"); 
  }, 500);
}

// --- YOUR APPLICATION CODE ---
let userBankBalance = 100;
const cartTotal = 50;

console.log(`Initial Bank Balance: $${userBankBalance}`);
console.log("Submitting order...");

// We hand our callback to the 3rd party function. We have lost control.
processStripePayment(cartTotal, (err, successMessage) => {
  if (err) return console.error(err);
  
  // We assume this only runs once!
  userBankBalance -= cartTotal;
  
  console.log(`✅ ${successMessage}`);
  console.log(`💰 New Bank Balance: $${userBankBalance}`);
  
  if (userBankBalance < 0) {
    console.log("🚨 FATAL ALERT: Overdrafted user account!");
  }
});