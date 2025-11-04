// FizzBuzz
function fizzBuzz() {
  for (let i = 1; i <= 100; i++) {
    if (i % 3 == 0 && i % 5 == 0) {
      console.log("FizzBuzz");
    } else if (i % 3 == 0) {
      console.log("Fizz");
    } else if (i % 5 == 0) {
      console.log("Buzz");
    } else {
      console.log(i);
    }
  }
}

// Reverse String
function reverseString(str) {
  let inverse = "";

  for (let i = str.length - 1; i >= 0; i--) {
    inverse += str[i];
  }
  return inverse;
}

// Palindrome
function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  let left = 0;
  let right = cleaned.length - 1;

  while (left < right) {
    if (cleaned[left] !== cleaned[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}

// Max Number
function findMax(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[1] > max) {
      max = arr[i];
    }
  }
  return max;
}

// Count Vowels
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

// Sum of Arrays
const sumArray = (arr) => {
  let sum = 0;
  for (let item of arr) {
    sum += item;
  }
  return sum;
};

// Factorial
function factorialIterative(n) {
  if (n == 0) return 1;
  let result = 1;
  for (let i = 1; i <= n; i++) {
    result *= i;
  }
  return result;
}

function factorialRecursive(n) {
  if (n === 0 || n === 1) return 1;
  return n * factorialRecursive(n - 1);
}

// Looping a triangle
function printTriangle(height) {
  let line = "";
  for (let i = 1; i <= height; i++) {
    line += "#";
    console.log(line);
  }
}

function chessboard(size) {
  board = "";
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

console.log(countChar("hello", "l")); // 2
console.log(countChar("JavaScript", "a")); // 2 (case-insensitive)
console.log(countChar("Mississippi", "s")); // 4
