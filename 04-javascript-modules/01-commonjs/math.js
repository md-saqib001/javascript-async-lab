// math.js - A CommonJS Module
const secretPi = 3.14159; // This stays completely private to this file!

function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

// We expose a public object containing only what we want to share
module.exports = {
  add: add,
  multiply: multiply
};