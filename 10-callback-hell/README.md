# Phase 10 — Callback Hell and Inversion of Control

## Goal
Experience the architectural limitations of heavily nested callbacks and understand why they make control flow, error handling, and trust incredibly difficult to manage.

---

## Lesson 1: The Pyramid of Doom

### 1. Dependent Steps
When dealing with multiple asynchronous steps that depend on each other (e.g., Authenticate -> Fetch Cart -> Charge Card), each step must be written inside the previous step's callback. 
This creates a deep triangle shape in the code known as the Pyramid of Doom.

### 2. Repeated Error Handling
Because each callback executes in its own isolated Call Stack timeline, a single `try/catch` block cannot catch their errors. You are forced to manually write `if (err) return handleError(err)` at every single level of the pyramid. If you forget even one, an error will silently crash the server.

---

## Lesson 2: Inversion of Control

### 1. Handing Over the Keys
When you pass a callback function to a third-party library, you lose control over your own code. This is called **Inversion of Control**. You are blindly trusting that the external library will execute your callback exactly once, at the correct time, and with the correct data.

### 2. The Vulnerabilities of Trust
If the external library has a bug, it might:
1. Call your callback multiple times (causing double-charges).
2. Never call your callback at all (leaving your user's browser hanging forever).
3. Call it synchronously instead of asynchronously (breaking the Event Loop rules).

To survive Inversion of Control using raw callbacks, developers had to write defensive boilerplate like "guard flags" (`let hasBeenCalled = false`) to manually protect their logic from being executed twice. 

**Takeaway:** Callbacks are a delivery mechanism, not a control-flow system. To regain control, we need an object that guarantees an asynchronous task will only settle *once*. We need Promises.