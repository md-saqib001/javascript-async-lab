console.log("1. Requesting user profile...");

function getBrokenUserAsync(id) {
  // We simulate a database query that takes 1 second
  setTimeout(() => {
    const user = { id: id, name: "mdsaqib" };
    // This return is USELESS. The outer function has already finished!
    return user; 
  }, 1000);
  
  // Notice there is no return statement here in the outer function.
  // In JavaScript, a function without a return automatically returns `undefined`.
}

const userProfile = getBrokenUserAsync(1);
console.log("2. Did we get the user?", userProfile);

// Let's fix it by passing a callback as a delivery mechanism!
function getFixedUserAsync(id, deliveryCallback) {
  setTimeout(() => {
    const user = { id: id, name: "admin" };
    // Instead of returning, we execute the callback and pass the data INTO it
    deliveryCallback(user);
  }, 1500);
}

getFixedUserAsync(2, (deliveredUser) => {
  console.log("\n3. 📦 User successfully delivered via callback!", deliveredUser);
});