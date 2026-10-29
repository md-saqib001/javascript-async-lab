# Phase 06 — Synchronous Execution and the Call Stack

## Goal
Build a first-principles mental model of the V8 Engine's Call Stack. Understand exactly what "single-threaded, synchronous execution" means at the physical memory level, how functions pause and resume, and why infinite recursion crashes the server.

---

## Lesson 1: The LIFO Call Stack

### 1. The "Why" and "When"
JavaScript is **single-threaded**. It has exactly one Call Stack. It can only execute one function at a time. To understand asynchronous programming later, you must first deeply understand how JavaScript handles synchronous work. 

If Function A calls Function B, the engine cannot run them both at the same time. It must physically pause Function A, jump into Function B, finish it, and then resume Function A.

### 2. The LIFO Data Structure
The Call Stack operates as a **Last-In, First-Out (LIFO)** data structure. Think of it like a stack of plates:
1. The engine pushes `makeBurger()` onto the empty stack.
2. `makeBurger()` calls `chopOnion()`. The engine pushes `chopOnion()` on top of `makeBurger()`. `makeBurger()` is now frozen.
3. `chopOnion()` calls `sharpenKnife()`. The engine pushes `sharpenKnife()` on top.
4. When `sharpenKnife()` finishes, it is popped off the top. The engine resumes `chopOnion()`.

**Takeaway:** A line of synchronous JavaScript absolutely cannot execute until the line above it—and any function that line calls—has completely finished and returned.

---

## Lesson 2: Execution Contexts and `console.trace()`

### 1. What is a Stack Frame?
When the engine freezes a function and jumps to another, it needs a way to remember exactly where it left off. It creates a **Stack Frame** in RAM. A Stack Frame contains:
- The local variables of the function.
- The arguments passed into the function.
- The **Return Address** (the exact line of code the engine must jump back to when the current nested function finishes).

### 2. X-Raying the Stack
By calling `console.trace()`, we force the V8 engine to print every Stack Frame currently in memory. The output perfectly visualizes the LIFO structure, with the most recently called function at the very top, and the global execution context at the very bottom.

---

## Lesson 3: The Stack Overflow (`RangeError`)

### 1. The Physical Memory Limit
The Call Stack is not infinite. On a 64-bit operating system, the V8 engine typically allocates about 1 Megabyte of RAM strictly for the Call Stack. 

### 2. The Danger of Infinite Recursion
If a function calls itself recursively without a base case to stop it (or if two functions accidentally call each other in an infinite loop), the engine rapidly pushes thousands of Stack Frames into memory. 

Because no function ever hits a `return` statement, no frames are ever popped off. The stack grows until it hits that 1MB memory ceiling. At that exact millisecond (usually around 10,000 to 13,000 frames depending on the size of the local variables), V8 panics and throws a `RangeError: Maximum call stack size exceeded`. 

**Takeaway:** Synchronous execution is highly structured but vulnerable. If a function never returns, the thread is destroyed.