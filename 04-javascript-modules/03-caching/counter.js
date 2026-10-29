// Node executes this top-level code ONLY ONCE!
console.log("🚀 [counter.js] Module is booting up! This should only print ONCE.");

let visits = 0;

module.exports = {
  addVisit: () => visits++,
  getVisits: () => visits
};