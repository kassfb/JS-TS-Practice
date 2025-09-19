// https://www.codewars.com/kata/526571aae218b8ee490006f4/typescript

// Title:
// Bit Counting

// Description:
// Write a function that takes an integer as input, and returns the number of bits that are equal to one in the binary representation of that number. You can guarantee that input is non-negative.

// Example: The binary representation of 1234 is 10011010010, so the function should return 5 in this case

// Bits Algorithms

// SOLUTION 1:
export function countBits(n: number): number {
  let count = 0;
  
  while (n > 0) {
    if (n % 2 !== 0) {
      count++;
    }
    n = Math.floor(n/2);
  }

  return count;
}

// SOLUTION 2:
export function countBits(n: number): number {
  return n.toString(2).replace(/0/g, '').length;
}

// SOLUTION 3:
export function countBits(n: number) {
  return n.toString(2).split('').filter(c => c === '1').length
}
