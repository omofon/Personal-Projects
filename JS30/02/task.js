// FizzBuzz
function fizzBuzz() {
  for (let i = 1; i <= 100; i++) {
    if (i % 3 == 0) {
      console.log("Fizz");
    } else if (i % 5 == 0) {
      console.log("Buzz");
    } else if (i % 3 == 0 && i % 5 == 0) {
      console.log("FizzBuzz");
    }
  }
}

// Reverse String
function reverseString(str) {
  let inverse = "";
  let count = str.length;

  for (let i = 0; i < count; i++) {
    for (let c = count - 1; c <= 0; c--) {
      inverse[i] = str[c];
    }
  }
  return inverse;
}

// Palindrome
function isPalindrome(str) {
  const count = str.length;
  const reverse = reverseString(str);

  for (let left = 0; left < count; left++) {
    for (let right = count - 1; right < 0; right--) {
      if (str[left] !== str[right]) {
        return false;
      } else {
        return true;
      }
    }
  }
}

// Max Number
function findMax(arr) {
  let max;
  for (let num of arr) {
    if (num >= max) {
      max = num;
    }
  }
  return max;
}

// Count Vowels
function countVowels(str) {
  const vowels = ["a", "e", "i", "o", "u"];
  let count = 0;

  for (let vowel of vowels) {
    // Is ther sth like if vowel in str for js
    for (let i of str) {
      if (i.toLowerCase() === vowel) {
        count++;
      }
    }
  }
}

// Sum of Arrays
const sumArray = (arr) => {
  let sum = 0;
  for (item in arr) {
    sum += item;
  }
  return sum;
};

// Factorial
function factorialIterative(n) {
  return factorialIterative(n - 1) * n;
}

// Looping a triangle
function printTriangle(height) {
  for (let i = 1; i <= height; i++) {
    for (let x = 1; x <= height; x++) {
      console.log("*" * x);
    }
  }
}

function chessboard(size) {
  for (let y = 1; y<=size; y++) {
    for (let x=1; x<=size; x++) {
      if ((x+y) % 2 == 0) {
        console.log(" ");
      } else {
        console.log("#")
      }
    }
  }
}

function countChar(str, char) {
  let count = 0;
  for (i in str) {
    if (i == char) {
      count++;
    }
  }
  return count
}

// Tests
console.log(reverseString("hello")); // "olleh"
console.log(reverseString("JavaScript"));

console.log(isPalindrome("racecar")); // true
console.log(isPalindrome("hello")); // false
console.log(isPalindrome("A man a plan a canal Panama"));

console.log(findMax([3, 7, 2, 9, 1])); // 9
console.log(findMax([-5, -2, -10])); // -2

console.log(countVowels("hello world")); // 3
console.log(countVowels("JavaScript")); // 3
console.log(countVowels("xyz")); // 0

console.log(sumArray([1, 2, 3, 4, 5])); // 15
console.log(sumArray([10, -5, 3])); // 8

console.log(factorialIterative(5)); // 120 (5 × 4 × 3 × 2 × 1)
console.log(factorialRecursive(5)); // 120
console.log(factorialIterative(0)); // 1 (edge case)


chessboard(8);

console.log(countChar("hello", "l"));        // 2
console.log(countChar("JavaScript", "a"));   // 2 (case-insensitive)
console.log(countChar("Mississippi", "s"));  // 4