// https://www.codewars.com/kata/55bf01e5a717a0d57e0000ec

// Description:
// Write a function, persistence, that takes in a positive parameter num and returns its multiplicative persistence, which is the number of times you must multiply the digits in num until you reach a single digit.

// For example (Input --> Output):

// 39 --> 3 (because 3*9 = 27, 2*7 = 14, 1*4 = 4 and 4 has only one digit, there are 3 multiplications)
// 999 --> 4 (because 9*9*9 = 729, 7*2*9 = 126, 1*2*6 = 12, and finally 1*2 = 2, there are 4 multiplications)
// 4 --> 0 (because 4 is already a one-digit number, there is no multiplication)
// Fundamentals Mathematics

// SOLUTION 1:
export function persistence(num: number): number {
 let multiplicativePersistence = 0;

  while (num > 9) {
    multiplicativePersistence++;
    num = multiplyDigits(num);
  }
  
  return multiplicativePersistence;
}

function multiplyDigits(num: number): number {
  let multiplyDigits = 1;
  while (num > 0) {
    multiplyDigits *= num % 10;
    num = Math.trunc(num / 10);
  }
  
  return multiplyDigits;
}

// SOLUTION 2:
export function persistence(num: number): number {
  let count = 0
  while (num > 9) {
    num = String(num).split('').map(d => +d).reduce((prev, current) => prev *= current);
    count++;
  }
  return count;
}

// SOLUTION 3:
export function persistence(num: number): number {
  return num < 10 ? 0 : 1 + persistence([...num.toString()].reduce((a, c) => a * +c, 1));
}
