# Day 1: JavaScript Fundamentals & Core Syntax

## 🎯 Today's Goal
Master JavaScript basics, data types, operators, and control flow. Build muscle memory for syntax you'll use daily.

---

## 📚 Core Concepts (30 mins)

### 1. Variables & Declarations
```javascript
// Three ways to declare variables
let age = 25;           // Block-scoped, reassignable
const name = "John";    // Block-scoped, constant
var old = "avoid";      // Function-scoped (legacy, avoid)

// Modern JavaScript: Use const by default, let when you need to reassign
```

**Key Points:**
- `const` doesn't mean immutable—objects/arrays can still be modified
- `let` is block-scoped (dies after `{}`)
- Never use `var` in modern code

### 2. Data Types
```javascript
// Primitives
const num = 42;                    // Number
const str = "Hello";               // String
const bool = true;                 // Boolean
const nothing = null;              // Null (intentional empty)
const undef = undefined;           // Undefined (hasn't been set)
const sym = Symbol("unique");      // Symbol (unique identifier)
const big = 123456789012345678n;   // BigInt (large integers)

// Reference Types
const arr = [1, 2, 3];
const obj = { key: "value" };
const func = () => {};
```

### 3. Type Checking & Coercion
```javascript
typeof 42;              // "number"
typeof "hello";         // "string"
typeof true;            // "boolean"
typeof undefined;       // "undefined"
typeof null;            // "object" (JavaScript quirk!)
typeof [];              // "object"
typeof {};              // "object"

// Better array check
Array.isArray([]);      // true

// Truthy vs Falsy
// Falsy: false, 0, "", null, undefined, NaN
// Everything else is truthy

if ("") console.log("won't run");
if ("hello") console.log("will run");
```

### 4. Operators You'll Use Daily
```javascript
// Arithmetic
5 + 3;    // 8
5 - 3;    // 2
5 * 3;    // 15
5 / 3;    // 1.666...
5 % 3;    // 2 (modulo/remainder)
5 ** 3;   // 125 (exponentiation)

// Comparison (use strict equality!)
5 === 5;     // true (strict equal - checks type too)
5 == "5";    // true (loose equal - avoid this!)
5 !== 6;     // true (strict not equal)

// Logical
true && false;   // false (AND)
true || false;   // true (OR)
!true;           // false (NOT)

// Nullish Coalescing (modern)
const value = null ?? "default";  // "default"
const value2 = 0 ?? "default";    // 0 (only null/undefined trigger ??)

// Optional Chaining (modern)
const user = { address: { city: "NYC" } };
user?.address?.city;     // "NYC"
user?.phone?.number;     // undefined (no error!)
```

### 5. Control Flow
```javascript
// If/Else
if (score >= 90) {
  console.log("A");
} else if (score >= 80) {
  console.log("B");
} else {
  console.log("C");
}

// Ternary (for simple conditions)
const grade = score >= 90 ? "A" : "B";

// Switch
switch (day) {
  case "Monday":
    console.log("Start of week");
    break;
  case "Friday":
    console.log("TGIF");
    break;
  default:
    console.log("Regular day");
}

// Loops
for (let i = 0; i < 5; i++) {
  console.log(i);  // 0, 1, 2, 3, 4
}

let i = 0;
while (i < 5) {
  console.log(i++);
}

// Modern iteration
const arr = [1, 2, 3];
for (const num of arr) {
  console.log(num);
}

const obj = { a: 1, b: 2 };
for (const key in obj) {
  console.log(key, obj[key]);
}
```

### 6. String Essentials
```javascript
// Template literals (modern way)
const name = "John";
const greeting = `Hello, ${name}!`;  // "Hello, John!"

// String methods you'll use constantly
"hello".length;              // 5
"hello".toUpperCase();       // "HELLO"
"HELLO".toLowerCase();       // "hello"
"hello"[0];                  // "h" (access by index)
"hello".charAt(0);           // "h"
"hello world".split(" ");    // ["hello", "world"]
"  hello  ".trim();          // "hello"
"hello".includes("ell");     // true
"hello".indexOf("l");        // 2 (first occurrence)
"hello".slice(1, 4);         // "ell" (start, end)
```

---

## 💪 Problems to Solve (2-3 hours)

### Problem 1: FizzBuzz (Classic Warm-up) ⭐
Write a function that prints numbers 1-100, but:
- Print "Fizz" for multiples of 3
- Print "Buzz" for multiples of 5
- Print "FizzBuzz" for multiples of both

```javascript
function fizzBuzz() {
  // Your code here
}
```

**Why this matters:** Tests your understanding of loops, conditionals, and modulo operator. Classic interview question.

---

### Problem 2: Reverse String ⭐
Write a function that reverses a string without using `.reverse()`.

```javascript
function reverseString(str) {
  // Your code here
}

console.log(reverseString("hello")); // "olleh"
console.log(reverseString("JavaScript")); // "tpircSavaJ"
```

**Hint:** Loop backwards or build a new string.

---

### Problem 3: Palindrome Checker ⭐⭐
Check if a string is a palindrome (reads same forwards and backwards).
Ignore case and non-alphanumeric characters.

```javascript
function isPalindrome(str) {
  // Your code here
}

console.log(isPalindrome("racecar"));      // true
console.log(isPalindrome("hello"));        // false
console.log(isPalindrome("A man a plan a canal Panama")); // true
```

**Why this matters:** String manipulation + algorithm thinking. Common in coding interviews.

---

### Problem 4: Find Max Number ⭐
Find the largest number in an array without using `Math.max()`.

```javascript
function findMax(arr) {
  // Your code here
}

console.log(findMax([3, 7, 2, 9, 1])); // 9
console.log(findMax([-5, -2, -10]));   // -2
```

**Hint:** Track the max as you iterate.

---

### Problem 5: Count Vowels ⭐
Count the number of vowels (a, e, i, o, u) in a string.

```javascript
function countVowels(str) {
  // Your code here
}

console.log(countVowels("hello world")); // 3
console.log(countVowels("JavaScript"));  // 3
console.log(countVowels("xyz"));         // 0
```

---

### Problem 6: Sum of Array ⭐
Calculate sum without using `.reduce()`.

```javascript
function sumArray(arr) {
  // Your code here
}

console.log(sumArray([1, 2, 3, 4, 5])); // 15
console.log(sumArray([10, -5, 3]));     // 8
```

---

### Problem 7: Factorial ⭐⭐
Calculate factorial both iteratively AND recursively.
Factorial: n! = n × (n-1) × (n-2) × ... × 1

```javascript
function factorialIterative(n) {
  // Your code here using loops
}

function factorialRecursive(n) {
  // Your code here using recursion
}

console.log(factorialIterative(5));  // 120 (5 × 4 × 3 × 2 × 1)
console.log(factorialRecursive(5));  // 120
console.log(factorialIterative(0));  // 1 (edge case)
```

**Why this matters:** Introduces recursion, which you'll see in many LeetCode problems.

---

### Problem 8: Looping a Triangle ⭐
Print a triangle pattern using loops:
```
#
##
###
####
#####
####### 
```

```javascript
function printTriangle(height) {
  // Your code here
}

printTriangle(7);
```

---

### Problem 9: Chessboard Pattern ⭐⭐
Create a chessboard pattern of given size. Use spaces and `#` characters.

For size 8:
```
 # # # #
# # # # 
 # # # #
# # # # 
 # # # #
# # # # 
 # # # #
# # # # 
```

```javascript
function chessboard(size) {
  // Your code here
  // Hint: Use nested loops and check if row + column is even/odd
}

chessboard(8);
```

---

### Problem 10: Character Count ⭐⭐
Count the occurrences of a specific character in a string (case-insensitive).

```javascript
function countChar(str, char) {
  // Your code here
}

console.log(countChar("hello", "l"));        // 2
console.log(countChar("JavaScript", "a"));   // 2 (case-insensitive)
console.log(countChar("Mississippi", "s"));  // 4
```

---

## 🎓 Solutions & Explanations

<details>
<summary><strong>Click to reveal solutions (try solving first!)</strong></summary>

### Solution 1: FizzBuzz
```javascript
function fizzBuzz() {
  for (let i = 1; i <= 100; i++) {
    if (i % 15 === 0) {
      console.log("FizzBuzz");
    } else if (i % 3 === 0) {
      console.log("Fizz");
    } else if (i % 5 === 0) {
      console.log("Buzz");
    } else {
      console.log(i);
    }
  }
}
```
**Key:** Check 15 first (3 and 5), then individual checks.

### Solution 2: Reverse String
```javascript
// Method 1: Loop backwards
function reverseString(str) {
  let reversed = "";
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
}

// Method 2: Modern approach
function reverseString2(str) {
  return str.split("").reverse().join("");
}
```

### Solution 3: Palindrome Checker
```javascript
function isPalindrome(str) {
  // Clean string: lowercase, remove non-alphanumeric
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  
  // Compare with reversed version
  const reversed = cleaned.split("").reverse().join("");
  return cleaned === reversed;
}
```

### Solution 4: Find Max
```javascript
function findMax(arr) {
  if (arr.length === 0) return undefined;
  
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}
```

### Solution 5: Count Vowels
```javascript
function countVowels(str) {
  const vowels = "aeiouAEIOU";
  let count = 0;
  
  for (let char of str) {
    if (vowels.includes(char)) {
      count++;
    }
  }
  return count;
}
```

### Solution 6: Sum Array
```javascript
function sumArray(arr) {
  let sum = 0;
  for (let num of arr) {
    sum += num;
  }
  return sum;
}
```

### Solution 7: Factorial
```javascript
// Iterative
function factorialIterative(n) {
  if (n === 0) return 1;
  
  let result = 1;
  for (let i = 1; i <= n; i++) {
    result *= i;
  }
  return result;
}

// Recursive
function factorialRecursive(n) {
  if (n === 0 || n === 1) return 1;
  return n * factorialRecursive(n - 1);
}
```

### Solution 8: Triangle
```javascript
function printTriangle(height) {
  let line = "";
  for (let i = 1; i <= height; i++) {
    line += "#";
    console.log(line);
  }
}
```

### Solution 9: Chessboard
```javascript
function chessboard(size) {
  let board = "";
  
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if ((row + col) % 2 === 0) {
        board += " ";
      } else {
        board += "#";
      }
    }
    board += "\n";
  }
  
  console.log(board);
}
```

### Solution 10: Character Count
```javascript
function countChar(str, char) {
  let count = 0;
  const lowerStr = str.toLowerCase();
  const lowerChar = char.toLowerCase();
  
  for (let c of lowerStr) {
    if (c === lowerChar) {
      count++;
    }
  }
  return count;
}
```

</details>

---

## 🚀 End of Day Checklist

- [ ] Understand let, const, and why var is deprecated
- [ ] Know all primitive types and how to check them
- [ ] Master truthy/falsy values
- [ ] Use strict equality (===) by default
- [ ] Write for loops, while loops, and for...of loops
- [ ] Solve all 10 problems above
- [ ] Can explain recursion to someone else

---

## 📝 Quick Reference Card

```javascript
// Variable declaration
const name = "value";  // Can't reassign
let count = 0;         // Can reassign

// Loops
for (let i = 0; i < n; i++) { }
while (condition) { }
for (const item of array) { }

// Conditionals
if (condition) { } else { }
value ? ifTrue : ifFalse

// String methods
str.length, .toUpperCase(), .toLowerCase()
.includes(), .indexOf(), .slice(), .split()

// Common checks
typeof value
Array.isArray(value)
value === undefined
value === null
```

---

## 💡 Tomorrow Preview: Day 2
- Functions (arrow functions, closures, higher-order functions)
- Arrays (map, filter, reduce, spread operator)
- Objects and destructuring
- More complex algorithmic problems

**Time estimate:** 3-4 hours total for Day 1