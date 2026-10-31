// --- MOCK ASYNC APIs ---
function authenticateUser(username, cb) {
  setTimeout(() => cb(null, { id: 99, name: username }), 300);
}

function getCartItems(userId, cb) {
  setTimeout(() => cb(null, ["MacBook Pro", "Wireless Mouse"]), 300);
}

function chargeCreditCard(amount, cb) {
  setTimeout(() => cb(null, { status: "Success", transactionId: "TXN-789" }), 300);
}

function sendReceiptEmail(transactionId, cb) {
  setTimeout(() => cb(null, "Receipt delivered to inbox!"), 300);
}

// --- THE PYRAMID OF DOOM ---
console.log("🛒 Starting checkout process...");

authenticateUser("mdsaqib", (authErr, user) => {
  // 🚨 1st Error Check
  if (authErr) return console.error("Auth failed:", authErr);
  console.log("👤 User authenticated:", user.name);

  getCartItems(user.id, (cartErr, items) => {
    // 🚨 2nd Error Check (Repeated boilerplate!)
    if (cartErr) return console.error("Cart fetch failed:", cartErr);
    console.log(`🛍️ Cart loaded with ${items.length} items.`);

    chargeCreditCard(2500, (chargeErr, receipt) => {
      // 🚨 3rd Error Check
      if (chargeErr) return console.error("Payment failed:", chargeErr);
      console.log("💳 Payment successful. TXN:", receipt.transactionId);

      sendReceiptEmail(receipt.transactionId, (emailErr, msg) => {
        // 🚨 4th Error Check
        if (emailErr) return console.error("Email failed:", emailErr);
        console.log("✉️ " + msg);
        
        console.log("✅ Checkout complete!");
      });
    });
  });
});