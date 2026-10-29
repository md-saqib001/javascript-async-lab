# Phase 07 — Call Stack and Blocking

## Goal
Experience how a long synchronous task physically occupies the JavaScript thread and completely starves other work, delaying asynchronous callbacks and freezing the application.

---

## Lesson 1: The Danger of the Single Thread

### 1. CPU-Bound vs. I/O-Bound Work
In backend engineering, tasks are split into two types:
*   **CPU-Bound:** The processor is doing heavy math (e.g., hashing a password, parsing a 50MB JSON file, or running a 100-million iteration `while` loop).
*   **I/O-Bound (Input/Output):** The processor is waiting for an external system (e.g., waiting for a database to reply, or waiting for an API to return data).

### 2. Blocking the Main Thread
Because JavaScript has only one Call Stack, a heavy CPU-Bound task sits at the top of the stack and refuses to pop off until it finishes. We call this **Blocking**. 
If a task takes 3 seconds to execute, the V8 engine is trapped for 3 seconds. It cannot handle new HTTP requests, it cannot trigger database callbacks, and it cannot execute timers. 

---

## Lesson 2: The Frozen Heartbeat

### 1. The Illusion of Interruptions
It is a common misconception that timers like `setInterval` or `setTimeout` run on a parallel thread and can interrupt your code. They cannot.

### 2. The Difference Between "Due" and "Executed"
In our experiment, we set a heartbeat to run every 200ms. But when we dropped a 3-second synchronous `while` loop onto the Call Stack, the heartbeat completely stopped.

This proves a fundamental rule of JavaScript: **A timer being "due" is not the same as a timer's callback actually running.** 
The operating system knows the 200ms timer is finished, but it cannot inject the callback into the Call Stack because the stack is currently blocked by the `while` loop. The callback must wait in a queue until the Call Stack is completely empty.

**Takeaway:** Never put heavy CPU-bound math operations on the main Node.js thread, or you will freeze the entire server for all other users.